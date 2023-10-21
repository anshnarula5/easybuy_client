import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserDetails, updateUserProfile } from "../redux/actions/userActions";
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listMyOrders } from "../redux/actions/orderActions";
import Meta from "../components/Meta";
const ProfileScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { email, name, password } = formData;
  const { userInfo } = useSelector((state) => state.userLogin);
  const { user, loading, error } = useSelector((state) => state.userDetails);
  const { success } = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingOrders,
    error: orderError,
    orders,
  } = useSelector((state) => state.myOrders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      navigate("/auth");
    } else {
      if (user && !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setFormData({email : user.email, name : user.name})
      }
      dispatch(listMyOrders());
    }
  }, [userInfo, navigate, dispatch, user]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    dispatch(updateUserProfile(formData))
  }
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return "No user";
  }
  return (
    <Row>
      <Meta title = {user.name} />
      <Col md={4}>
        <h3>User Profile</h3>
        {loading ? <Loader /> : error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile updated</Message>}
        <ListGroup variant="flush">
          <ListGroupItem>Name : {user.name}</ListGroupItem>
          <ListGroupItem>Email : {user.email}</ListGroupItem>
          <ListGroupItem>
          <Form >
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                value={name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Button onClick = {handleSubmit} className=  "btn btn-sm">Update</Button>
          </Form>
          </ListGroupItem>
          </ListGroup>
          
      </Col>
      <Col md={8}>
        <h3>My Orders</h3>
        {loadingOrders ? (
          <Loader />
        ) : orderError ? (
          <Message variant="danger">{orderError}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.length > 0 &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times"></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times"></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/orders/${order._id}`}>
                        <Button variant="light" className="btn-sm">
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
