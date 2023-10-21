import React from "react";
import { Card } from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="mb-2" style= {{borderRadius : 0}}>
      <Link to={`/product/${product._id}`}  style = {{backgroundColor : "white"}} >
        <Card.Img src={product.image} variant="top" style = {{height : "15rem", objectFit : "scale-down"}} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text>
          <small><i>{product.category}</i></small>
          <div className="my-1">
            <Rating
              value={product.rating}
              text={` ${product.numReviews} reviews`}
              color="gold"
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">$ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
