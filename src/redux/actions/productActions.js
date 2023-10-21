import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_PRODUCT_DETAILS,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  URI,
} from "../types";

export const listProducts = (keyword = "", pageNumber = "", category = "", sort = "", range) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const res = await axios.get(`${URI}/api/products?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}&sort=${sort}&range=${range}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_PRODUCTS_REQUEST });
    const res = await axios.get(`${URI}/api/products/top`);
    dispatch({ type: TOP_PRODUCTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: TOP_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({type: PRODUCT_DELETE_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.delete(`${URI}/api/products/${id}`, config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({type: PRODUCT_CREATE_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.post(`${URI}/api/products`, {}, config);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload : res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({type: PRODUCT_UPDATE_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.put(`${URI}/api/products/${product._id}`, product, config);
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload : res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const res = await axios.get(`${URI}/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const clearProductDetails = () => async (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT_DETAILS, payload: {} });
};


export const createReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
     await axios.post(`${URI}/api/products/${productId}/reviews`, review, config);
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS});
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};