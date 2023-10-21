import React, { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import {
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
  Card,
  FormSelect,
} from "react-bootstrap";
import Message from "../components/Message";
import Meta from "../components/Meta";

const CartScreen = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;
  const qty = location.search
    ? new URLSearchParams(location.search).get("qty")
    : 1;
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  console.log(cartItems);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, qty, dispatch]);
  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleCheckout = () => {
    if (!userInfo) {
      navigate("/auth");
    } else {
      navigate("/shipping");
    }
  };
  return (
    <>
      <Meta title=  "View Cart" />
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} className="my-1">
                   $ {item.price}
                  </Col>
                  <Col md={2} xs={6}>
                    <FormSelect
                      className="my-1"
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormSelect>
                  </Col>
                  <Col md={2} xs={6}>
                    <Button
                      className="mt-2"
                      variant="light"
                      onClick={() => removeHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h5>
                Total Items :{" "}
                <bold>
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </bold>
              </h5>
              <h5>
                Total Price : $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h5>
            </ListGroupItem>
            <ListGroupItem>
              <Button
                className="btn-block"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
      </Row>
      </>
  );
};

export default CartScreen;

// way jeans fashion today patch main tiger april ripple faint situate scheme
