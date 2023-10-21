import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_PRODUCT_DETAILS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} from "../types";

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload.products, page : payload.page, pages : payload.pages  };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (state = { product : {reviews : []}}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DETAILS_FAIL:
      return {loading: false, error: payload};
      case CLEAR_PRODUCT_DETAILS:
        return { loading: true, product: { reviews: [] } };
    default:
      return state;
  }
};
export const productReviewCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true};
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success : true};
    case PRODUCT_CREATE_REVIEW_FAIL:
      return {loading: false, error: payload};
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state;
  }
};
export const topProductsReducer = (state = {products : []}, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOP_PRODUCTS_REQUEST:
      return { loading: true, products : []};
    case TOP_PRODUCTS_SUCCESS:
      return { loading: false, products : payload};
    case TOP_PRODUCTS_FAIL :
      return {loading: false, error: payload};
    default:
      return state;
  }
};
export const deleteProductReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true};
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success : true};
    case PRODUCT_DELETE_FAIL :
      return {loading: false, error: payload};
    default:
      return state;
  }
};
export const createProductReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true};
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success : true, product : payload};
    case PRODUCT_CREATE_FAIL :
      return {loading: false, error: payload};
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state;
  }
};
export const updateProductReducer = (state = {product :{}}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true};
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success : true, product : payload};
    case PRODUCT_UPDATE_FAIL :
      return {loading: false, error: payload};
    case PRODUCT_UPDATE_RESET:
      return {product : {}}
    default:
      return state;
  }
};
