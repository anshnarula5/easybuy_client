import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { login, register } from "../redux/actions/userActions";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { loading, userInfo, error } = useSelector((state) => state.userLogin);
  const [toggle, setToggle] = useState(false);
  const { email, name, password } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);
  const handleLogin = (e) => {
      e.preventDefault()
    dispatch(login({ email, password }));
  };
  const handleRegister = (e) => {
    e.preventDefault()
   dispatch(register({email, password, name}))
  }
  return (
    <Container>
      <Meta title=  "Login" />
      <Row className="justify-content-md-center">
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Col xs={12} md={6}>
          <h1 className="mb-3">Sign {!toggle ? "In" : "Up"}</h1>
          <Form onSubmit = {!toggle ? handleLogin : handleRegister}>
            {toggle && (
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
            )}
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
            <div className="mt-3 text-center">
              <p>
                {!toggle ? "Don't " : "Already "}have an account ?
                <Button
                  size="sm"
                  variant
                  onClick={() => setToggle((prev) => !prev)}
                >
                  Sign {toggle ? "In" : "Up"}
                </Button>
              </p>
              <Button className="btn btn-block" type = "submit">
                Sign {!toggle ? "In" : "Up"}{" "}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
