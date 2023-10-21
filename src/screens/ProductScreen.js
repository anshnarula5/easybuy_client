import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Form,
  FormGroup,
  FormLabel,
  Button,
  FormSelect,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Rating from "../components/Rating";
import { addToCart } from "../redux/actions/cartActions";
import {
  clearProductDetails,
  createReview,
  listProductDetails,
} from "../redux/actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/types";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({ rating: 0, comment: "" });
  const { rating, comment } = formData;
  const params = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successReview, error: reviewError } = productReviewCreate;
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (successReview) {
      alert("Review submitted");
      setFormData({ rating: 0, comment: "" });
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(params.id));
    return () => {
      dispatch(clearProductDetails());
    };
  }, [params.id, dispatch, successReview]);
  const handleAddToCart = () => {
    dispatch(addToCart(product._id, qty));
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview(params.id, formData));
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Meta title={product.name} />

      <Link className="btn btn-dark mb-1" to="/">
        Go Back
      </Link>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger" children={error} />
        ) : (
          <>
            <Col md={5}>
              <Image
                src={product.image}
                fluid
                className="sticky-top"
                style={{ top: "2rem" }}
              />
            </Col>
            <Col md={7}>
              <Row>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <h3>{product.name}</h3>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Rating
                        value={product.rating}
                        text={` ${product.numReviews} reviews`}
                      />
                    </ListGroupItem>
                    <ListGroupItem>Price : {product.price}</ListGroupItem>
                    <ListGroupItem>Category : {product.category}</ListGroupItem>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <Card style={{ borderRadius: 0, minHeight: "100%" }} className = "productStatus">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price : </Col>
                        <Col>$ {product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroupItem>
                      <Row>
                        <Col>Status :</Col>
                        <Col>
                          {product.countInStock > 0
                            ? "In stock"
                            : "Not in stock"}
                        </Col>
                      </Row>
                    </ListGroupItem>
                    {product.countInStock > 0 && (
                      <>
                        <ListGroupItem>
                          <Row>
                            <Col>Quantity :</Col>
                            <Col>
                              <FormSelect
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </FormSelect>
                            </Col>
                          </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                          <Button
                            className="btn btn-dark btn-block"
                            type="button"
                            onClick={handleAddToCart}
                          >
                            Add to cart
                          </Button>
                        </ListGroupItem>
                      </>
                    )}
                  </Card>
                </Col>
              </Row>

              {showAlert && (
                <Row>
                  <Col className="mt-2">
                    <Message
                      variant="success"
                      children={`Added ${qty} items to cart`}
                    />
                  </Col>
                </Row>
              )}
              <Row>
                <Col md={12} className="my-2">
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      Description : {product.description}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
              <Row className="my-2">
                <Col md={12}>
                  <h3>Reviews</h3>
                  {product.reviews.length === 0 && (
                    <Message>No reviews yet</Message>
                  )}
                  <ListGroup variant="flush">
                    {product.reviews.map((review) => (
                      <ListGroupItem key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <small className="text-muted">
                          {review.createdAt.substring(0, 10)}
                        </small>
                        <p>{review.comment}</p>
                      </ListGroupItem>
                    ))}
                    <ListGroupItem>
                      <h3>Leave a review</h3>
                      {reviewError && (
                        <Message variant="danger">{reviewError}</Message>
                      )}
                      {!userInfo ? (
                        <Message>
                          <Link to="/auth">Login</Link> to review the product{" "}
                        </Message>
                      ) : (
                        <Form onSubmit={handleSubmit}>
                          <FormGroup controlId="rating">
                            <FormLabel>Rating</FormLabel>
                            <FormSelect
                              value={rating}
                              name="rating"
                              onChange={handleChange}
                            >
                              <option value="">Select</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </FormSelect>
                          </FormGroup>
                          <FormGroup controlId="comment">
                            <FormLabel>Comment</FormLabel>
                            <Form.Control
                              as="textarea"
                              row={3}
                              onChange={handleChange}
                              name="comment"
                              value={comment}
                            />
                          </FormGroup>
                          <Button className="my-2" type="submit">
                            Submit
                          </Button>
                        </Form>
                      )}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default ProductScreen;
