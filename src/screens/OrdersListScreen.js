import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../redux/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../redux/types";
import { listAllOrders } from "../redux/actions/orderActions";
import Meta from "../components/Meta";

const OrdersListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    error: deleteError,
    loading: deleteLoading,
    success,
  } = useSelector((state) => state.deleteProduct);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
        dispatch(listAllOrders());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <Meta title=  "All orders" />
      
     <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/orders/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersListScreen;
