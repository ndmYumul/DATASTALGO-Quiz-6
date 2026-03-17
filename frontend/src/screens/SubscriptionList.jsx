import React, { useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listSubscriptions } from '../actions/subscriptionActions';

const SubscriptionList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const subscriptionList = useSelector((state) => state.subscriptionList) || { subscriptions: [] };
    const { loading, error, subscriptions } = subscriptionList;

    useEffect(() => {
        if (userInfo && userInfo.role === 'Admin') {
             dispatch(listSubscriptions());
        } else {
            navigate('/signin');
        }
    }, [dispatch, navigate, userInfo]);

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Subscription Transactions</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm bg-white shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>USER</th>
                            <th>TIER</th>
                            <th>SUBSCRIPTION ID</th>
                            <th>DATE</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions && subscriptions.length > 0 ? (
                            subscriptions.map((sub) => (
                                <tr key={sub.id}>
                                    <td>{sub.user_email}</td>
                                    <td>
                                        <span className={`badge ${
                                            sub.tier === 'Elite' ? 'bg-warning text-dark' : 
                                            sub.tier === 'Pro' ? 'bg-info' : 'bg-secondary'
                                        }`}>
                                            {sub.tier}
                                        </span>
                                    </td>
                                    <td>{sub.paypal_subscription_id}</td>
                                    <td>{sub.created_at.substring(0, 10)}</td>
                                    <td>
                                        <span className="text-success fw-bold">{sub.status}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-3">No subscription transactions found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default SubscriptionList;