import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { listProducts, deleteProduct, createProduct } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../redux/types";
import Meta from "../components/Meta";

const ProductListScreeen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, error, loading } = useSelector(
    (state) => state.productList
  );
  const {
    error: deleteError,
    loading: deleteLoading,
    success,
  } = useSelector((state) => state.deleteProduct);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {success: createSuccess, product: createdProduct, loading : createLoading, error : createError } = useSelector(
    (state) => state.createProduct
  );

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/auth");
    }
    if (createSuccess) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", "", "", "", [0, 1000]));
    }
    console.log(products)
  }, [dispatch, userInfo, navigate, success, createSuccess]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };
  const handleCreate = () => {
    dispatch(createProduct())
  };
  return (
    <>
      <Meta title = {`All products `} />
      
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={handleCreate}>
            <i className="fas fa-plus"> </i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Loader />}
      {deleteError && <Message variant="danger" children={deleteError} />}
      
      {createLoading && <Loader />}
      {createError && <Message variant="danger" children={createError} />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button
                      className="btn btn-sm btn-light"
                      style={{ borderRadius: 0 }}
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </Button>
                  </Link>
                  <Button
                    className="btn btn-sm btn-danger"
                    style={{ borderRadius: 0 }}
                    onClick={() => handleDelete(product._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreeen;
