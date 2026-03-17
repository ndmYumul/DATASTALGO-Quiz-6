import axios from 'axios'
import {
    SUBSCRIPTION_LIST_REQUEST,
    SUBSCRIPTION_LIST_SUCCESS,
    SUBSCRIPTION_LIST_FAIL
} from '../constants/subscriptionConstants'

export const listSubscriptions = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SUBSCRIPTION_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access}`,
            },
        }
        const { data } = await axios.get('/api/v1/subscriptions/', config)

        dispatch({ type: SUBSCRIPTION_LIST_SUCCESS, payload: data })
        } catch (error) {
        dispatch({
            type: SUBSCRIPTION_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}