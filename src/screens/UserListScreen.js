import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteUser, listUsers } from "../redux/actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, error, loading } = useSelector((state) => state.userList);
  const { success : deleteSuccess } = useSelector((state) => state.userDelete);
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/auth");
    }
  }, [dispatch, userInfo, navigate, deleteSuccess]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
    dispatch(deleteUser(id))
    }
  }
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "Not admin"}</td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button className = "btn btn-sm btn-light" style = {{borderRadius : 0}}>
                      <i className="fa fa-user"></i>
                    </Button>
                  </Link>
                    <Button className = "btn btn-sm btn-danger" style = {{borderRadius : 0}} onClick = {() => handleDelete(user._id)}>
                      <i className="fa fa-trash"></i>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
