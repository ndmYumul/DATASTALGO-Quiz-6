import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { 
    serviceListReducer, 
    serviceDetailsReducer,
} from './reducers/serviceReducers'
import {
    userLoginReducer,
    userRegisterReducer,
} from './reducers/userReducers'
import {
    orderListMyReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
    serviceList: serviceListReducer,
    serviceDetails: serviceDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    orderListMyReducer: orderListMyReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store