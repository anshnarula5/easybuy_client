import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
} from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { createOrder } from "../redux/actions/orderActions";
import Meta from "../components/Meta";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart= useSelector(
    (state) => state.cart
  );
  console.log(cart)
    const {shippingAddress, paymentMethod, cartItems} = cart
  //Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 100;

  const taxPrice = 0.15 * itemsPrice;

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const { success, order, error } = useSelector((state) => state.orderCreate);
  const handleSubmit = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice, 
        taxPrice,
        totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      navigate(`/orders/${order._id}`);
    }
  }, [success, navigate, order]);
  return (
    <>
      <Meta title = {`Place order `} />
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {shippingAddress.address}, {shippingAddress.city},
                {shippingAddress.postalCode},{shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method </h2>
              <p>
                <strong>Method : </strong>
                {paymentMethod}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, i) => (
                    <ListGroupItem key={i}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price} = ${" "}
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {itemsPrice.toFixed(2)} </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {shippingPrice.toFixed(2)} </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {taxPrice.toFixed(2)} </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
                </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block"
                  onClick={handleSubmit}
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
