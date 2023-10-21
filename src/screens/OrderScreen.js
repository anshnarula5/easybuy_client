import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Button
} from "react-bootstrap";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { deliverOrder, getOrderDetails, payOrder } from "../redux/actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET, URI } from "../redux/types"
import axios from "axios";

const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const { id: orderId } = params;

  const { userInfo } = useSelector((state) => state.userLogin);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: payLoading, success: paySuccess } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: deliverLoading, success: deliverSuccess } = orderDeliver;

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(`${URI}/api/config/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=AW8mE1eTTdcd-2MTxLf20Z_w8IAGuVlMt5AzygnwFYJhFkp2rskyD99JAWV3KRVjoqyDNL-Rbeqtg-e6`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || order._id !== orderId || paySuccess || deliverSuccess) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderId, dispatch, paySuccess, deliverSuccess]);

  const successPayHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }
  const handleDeliver = () => {
    dispatch(deliverOrder(order._id))
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" children={error} />
  ) : (
    <>

      <h3>Order : {order._id}</h3>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                Name : <strong>{order.user.name}</strong>
              </p>
              <p>
                Email :{" "}
                <strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </strong>
              </p>
              <p></p>
              <p>
                Address :
                <strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </strong>
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered at {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method </h2>
              <p>
                <p>
                  <strong>Method : </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid at {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not paid</Message>
                )}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, i) => (
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
                  <Col>$ {order.itemsPrice.toFixed(2)} </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {order.shippingPrice.toFixed(2)} </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {order.taxPrice.toFixed(2)} </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                Use these credentials for testing :
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Email :</Col>
                  <Col>sb-n4awe8849901@personal.example.com</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Password :</Col>
                  <Col>r*Gqn[W7</Col>
                </Row>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem>
                  {payLoading && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton amount={(Math.round(order.totalPrice * 100) / 100).toFixed(2)} onSuccess={successPayHandler} />
                  )}
                </ListGroupItem>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroupItem>
                  <Button className="btn btn-block" onClick={handleDeliver}>
                    Mark as delivered
                  </Button>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
