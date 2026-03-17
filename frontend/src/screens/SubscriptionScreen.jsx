import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SubscriptionScreen = () => {
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, [userInfo, navigate]);

    const tiers = [
        {
            title: 'Basic',
            price: '9.99',
            planId: 'P-BASIC_PLAN_ID', // From your PayPal Dashboard
            features: ['5 Spa Bookings/mo', 'Standard Support', 'Email Notifications']
        },
        {
            title: 'Pro',
            price: '19.99',
            planId: 'P-PRO_PLAN_ID',
            features: ['Unlimited Bookings', 'Priority Support', 'Exclusive Pool Access']
        },
        {
            title: 'Elite',
            price: '49.99',
            planId: 'P-ELITE_PLAN_ID',
            features: ['Personal Wellness Coach', '24/7 Support', 'VIP Lounge Access']
        }
    ];

    const successSubscriptionHandler = (details, tierTitle) => {
        console.log(`Subscribed to ${tierTitle}`, details);
        // Dispatch action to save subscription to Django backend here
    };

    return (
        <Container className="py-5">
            <h1 className="text-center mb-5 fw-bold">Choose Your Membership</h1>
            <Row>
                {tiers.map((tier) => (
                    <Col key={tier.title} md={4} className="mb-4">
                        <Card className="h-100 shadow border-0 text-center">
                            <Card.Header className="bg-primary text-white py-3">
                                <h3 className="mb-0">{tier.title}</h3>
                            </Card.Header>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="display-6 my-3">
                                    ${tier.price}<small className="text-muted">/mo</small>
                                </Card.Title>
                                <ul className="list-unstyled mb-4 flex-grow-1">
                                    {tier.features.map((feature, index) => (
                                        <li key={index} className="mb-2">
                                            <i className="fas fa-check text-success me-2"></i>{feature}
                                        </li>
                                    ))}
                                </ul>
                                
                                <PayPalScriptProvider options={{ 
                                    "client-id": "YOUR_CLIENT_ID",
                                    vault: true, // Required for subscriptions
                                    intent: "subscription" 
                                }}>
                                    <PayPalButtons
                                        style={{ layout: 'horizontal', label: 'subscribe' }}
                                        createSubscription={(data, actions) => {
                                            return actions.subscription.create({
                                                plan_id: tier.planId,
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.subscription.get().then((details) => {
                                                successSubscriptionHandler(details, tier.title);
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SubscriptionScreen;