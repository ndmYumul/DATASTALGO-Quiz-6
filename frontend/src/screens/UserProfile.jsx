import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMyOrders } from '../actions/orderActions';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderListMy = useSelector((state) => state.orderListMy) || {};
    const { loading: loadingOrders, error: errorOrders, orders = [] } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        } else {
            dispatch(listMyOrders());
        }
    }, [dispatch, navigate, userInfo]);

    return (
        <Row className="mt-4">
            <Col md={3}>
                <h2>User Information</h2>
                <ListGroup variant="flush" className="shadow-sm">
                    <ListGroup.Item><strong>Username:</strong> {userInfo?.username}</ListGroup.Item>
                    <ListGroup.Item><strong>Email:</strong> {userInfo?.email}</ListGroup.Item>
                    <ListGroup.Item><strong>Location:</strong> {userInfo?.location}</ListGroup.Item>
                    <ListGroup.Item><strong>Role:</strong> {userInfo?.role}</ListGroup.Item>
                </ListGroup>
            </Col>
            
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                ) : (
                    <Table striped bordered hover responsive className="table-sm shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>SERVICE</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.service_name}</td>
                                    <td>{order.created_at.substring(0, 10)}</td>
                                    <td>${order.total_price}</td>
                                    <td>
                                        {order.is_paid ? (
                                            <span className="text-success">{order.paid_at.substring(0, 10)}</span>
                                        ) : (
                                            <i className="fas fa-times" style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <Button 
                                            variant="light" 
                                            size="sm" 
                                            onClick={() => navigate(`/order/${order.id}`)}
                                        >
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default UserProfile;