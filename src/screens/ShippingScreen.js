import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router";
import CheckoutSteps from "../components/CheckoutSteps";
import {saveShippingAddress} from "../redux/actions/cartActions";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  let add;
  if (shippingAddress) {
    add = shippingAddress;
  } else {
    add = {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    };
  }
  const [formData, setFormData] = useState(add);
  const { address, country, city, postalCode } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(saveShippingAddress(formData))
      navigate("/payment")
  }
  return (
    <Row>
      <Col md={6} className="offset-md-3">
          <CheckoutSteps step1 step2 />
        <h1>Shipping Address</h1>
        <Form onSubmit = {handleSubmit}>
          <Form.Group className="my-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter address"
              name="address"
              required
              value={address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter city"
              name="city"
              value={city}
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>PIN code</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter pincode"
              name="postalCode"
              value={postalCode}
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter country"
              name="country"
              value={country}
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">Continue</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ShippingScreen;
