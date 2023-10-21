import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SearchBox = () => {
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (keyWord.trim()) {
      navigate(`/search/${keyWord}`);
      setKeyWord("");
    } else {
      navigate("/");
      setKeyWord("");
    }
  };
  return (
    <Form className="d-flex">
      <FormControl
        name="keyWord"
        value = {keyWord}
        style={{ borderRadius: 0 }}
        type="text"
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder="Search products"
        className="mr-sm-2 ml-sm-5"
      ></FormControl>
      <Button
        onClick = {handleSubmit}
        variant="outline-primary"
        style={{ borderRadius: 0 }}
      >
        <i className="fas fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
