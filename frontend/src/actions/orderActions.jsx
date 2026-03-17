import axios from 'axios';
import {
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
} from '../constants/orderConstants';

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        const { data } = await axios.get('/api/v1/orders/my/', config);

        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        const { data } = await axios.get(`/api/v1/orders/${id}/`, config);

        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/v1/orders/${orderId}/pay/`,
            paymentResult,
            config
        );

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/v1/orders/add/`, order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};
