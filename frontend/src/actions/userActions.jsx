import axios from 'axios'
import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    SELLER_APPLY_REQUEST, SELLER_APPLY_SUCCESS, SELLER_APPLY_FAIL,
} from '../constants/userConstants'
import { 
    USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
    SELLER_APPROVE_REQUEST, SELLER_APPROVE_SUCCESS, SELLER_APPROVE_FAIL 
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.post('/api/v1/users/login/', { 'email': email, 'password': password }, config)

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const register = (formData) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json' } }
        
        const { data } = await axios.post('/api/v1/users/register/', {
            'first_name': formData.firstName,
            'last_name': formData.lastName,
            'username': formData.username,
            'email': formData.email,
            'phone_number': formData.phone,
            'location': formData.location,
            'gender': formData.gender,
            'password': formData.password,
        }, config)

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        
        const { data } = await axios.get('/api/v1/users/', config)
        dispatch({ type: USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_LIST_FAIL, payload: error.response?.data.detail || error.message })
    }
}

export const approveSeller = (id, merchantId) => async (dispatch, getState) => {
    try {
        dispatch({ type: SELLER_APPROVE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }

        const { data } = await axios.put(`/api/v1/users/approve/${id}/`, { 'merchant_id': merchantId }, config)
        dispatch({ type: SELLER_APPROVE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SELLER_APPROVE_FAIL, payload: error.response?.data.detail || error.message })
    }
}

export const applyAsSeller = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: SELLER_APPLY_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // formData contains { businessName, description }
        const { data } = await axios.post('/api/v1/users/apply/', formData, config);

        dispatch({
            type: SELLER_APPLY_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: SELLER_APPLY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};