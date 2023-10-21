import axios from "axios"
import {CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_ADDRESS, SAVE_PAYMENT_METHOD, URI} from "../types"

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const {data} = await axios.get(`${URI}/api/products/${id}`)
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error)
    }
}

export const removeFromCart = (id) =>  (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: id})
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}   

export const saveShippingAddress = (data) =>  (dispatch) => {
    dispatch({type: SAVE_ADDRESS, payload: data})
    localStorage.setItem("shippingAddress", JSON.stringify(data))
}   

export const savePaymentMethod = (data) =>  (dispatch) => {
    dispatch({type: SAVE_PAYMENT_METHOD, payload: data})
    localStorage.setItem("paymentMethod", JSON.stringify(data))
}   