import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails, updateProduct } from "../redux/actions/productActions";
import {PRODUCT_UPDATE_RESET, URI, USER_UPDATE_RESET} from "../redux/types";
import axios from "axios";

const ProductEditScreen = () => {
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    price: 0,
    name: "",
    image: "",
    category: "",
    brand: "",
    countInStock: 0,
    description: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((state) => state.productDetails);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.updateProduct);
  const { price, name , image, category, brand, countInStock, description} = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    useEffect(() => {
    if(updateSuccess){
        dispatch({type : PRODUCT_UPDATE_RESET})
        navigate("/admin/productList")
    } else {
        if (!product.name || product._id !== id) {
            dispatch(listProductDetails(id));
          } else {
            setFormData({
              price: product.price,
              name: product.name,
              image: product.image,
              category: product.category,
              brand: product.brand,
              countInStock: product.countInStock,
              description: product.description,
            });
          }
    }
  }, [product, id, updateSuccess, navigate, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({_id : product._id, ...formData}));
  };
  const handleUpload = async (e) => {
    const file = e.target.files[0]
    const fd = new FormData()
    fd.append("image", file)
    setUploading(true)
    try {
      const config = {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      }
      const res = await axios.post(`${URI}/api/upload`, fd, config)
      setFormData({...formData, image : res.data})
      setUploading(false)
    } catch (e) {
      console.log(e)
      setUploading(false)
    }
  }
  return (
    <Container>
      <Row className="justify-content-md-center">
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Col xs={12} md={6}>
          <Link to="/admin/productList" className="btn btn-outline-dark">
            Go Back
          </Link>
          <h1 className="my-3">Update Product</h1>
          {updateError ? (
            <Message variant="danger">{updateError}</Message>
          ) : (
            updateLoading && <Loader />
          )}
          <Form onSubmit={handleSubmit}>
            <>
              <Form.Group controlId="name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter name"
                  value={name}
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>
            </>
            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter price"
                value={price}
                name="price"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter image"
                value={image}
                name="image"
                onChange={handleChange}
              />
              <Form.Group controlId="formFile" className="mb-3" onChange = {handleUpload}>
              {/* <image scr={`${window.location.origin}/${picture.name}`}/> */}
                <Form.Label>Choose file</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter category"
                value={category}
                name="category"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter brand"
                value={brand}
                name="brand"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Count In Stock </Form.Label>
              <Form.Control
                type="number"
                placeholder="enter countInStock"
                value={countInStock}
                name="countInStock"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as = "textarea"
                rows = {9}
                type="text"
                placeholder="enter description"
                value={description}
                name="description"
                onChange={handleChange}
              />
            </Form.Group>
           
            <div className="mt-3 text-center">
              <Button className="btn btn-block" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductEditScreen;
