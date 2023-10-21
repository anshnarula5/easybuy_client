import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  getUserDetails,
  updateUser,
} from "../redux/actions/userActions";
import { USER_UPDATE_RESET } from "../redux/types";

const UserEditScreen = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.userUpdate);
  const { email, name} = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userList");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setFormData({
          email: user.email,
          name: user.name,
        })
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, updateSuccess]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, isAdmin, ...formData }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Col xs={12} md={6}>
          <Link to="/admin/userList" className="btn btn-outline-dark">
            Go Back
          </Link>
          <h1 className="my-3">Update User</h1>
          {updateError ? (
            <Message variant="danger">{updateError}</Message>
          ) : (
            updateLoading && <Loader />
          )}
          <Form onSubmit={handleSubmit}>
            <>
              <Form.Group controlId="email" className="my-2">
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
            <Form.Group controlId="isAdmin" className="my-2">
              <Form.Check
                type="checkbox"
                defaultChecked={isAdmin}
                label="Is Admin"
                name="isAdmin"
                onChange={(e) => setIsAdmin(e.target.checked)}
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

export default UserEditScreen;
