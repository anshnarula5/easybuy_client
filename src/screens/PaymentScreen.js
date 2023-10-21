import React, { useState } from "react";
import { Form, Button, Row, Col, FormCheck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../redux/actions/cartActions";

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <Row>
      <Col md={6} className="offset-md-3">
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label as="legend" className = "mb-2">Select Method</Form.Label>
            <Col>
              <FormCheck className = "my-2"
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></FormCheck>
              {/* <FormCheck className = "my-2"
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></FormCheck> */}
            </Col>
          </Form.Group>
          <Button type="submit" className = "mt-2">Continue</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default PaymentScreen;
