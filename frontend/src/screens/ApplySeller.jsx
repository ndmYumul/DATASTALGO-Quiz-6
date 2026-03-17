import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { applyAsSeller } from '../actions/userActions';

const ApplySeller = () => {
    const [businessName, setBusinessName] = useState('');
    const [description, setDescription] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const sellerApply = useSelector((state) => state.sellerApply) || {};
    const { success } = sellerApply;
    
    // Logic: If already a seller or admin, they don't need to apply
    useEffect(() => {
    if (success) {
        navigate('/profile');
        dispatch({ type: 'SELLER_APPLY_RESET' });
    } else {
        if (userInfo && (userInfo.role === 'Seller' || userInfo.role === 'Admin')) {
            navigate('/profile');
        }
    }
}, [success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        // This calls the action that hits /api/v1/users/apply/
        dispatch(applyAsSeller({
            businessName: businessName,
            description: description
        }));
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h2 className="text-center mb-4">Partner With Serenity</h2>
                    <p className="text-muted text-center">
                        Submit your application to list your Spa or Pool services on our platform.
                    </p>
                    <Form onSubmit={submitHandler} className="shadow p-4 rounded bg-white">
                        <Form.Group className="mb-3" controlId="businessName">
                            <Form.Label>Business or Display Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your business name"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Service Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Describe the services you offer..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="w-100">
                            Submit Application
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ApplySeller;