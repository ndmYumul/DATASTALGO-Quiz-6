import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const addPayPalScript = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.paypal.com/sdk/js?client-id=ATfFVRCt0NxhlwT2ajMGeqm3aPzkz_SVi1TA2xhTfOiwPyJn2JpcFB5nd7PTcVY4FKXmN0UyvlNzfOwI&currency=USD';
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!order || successPay || order.id !== Number(id)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.is_paid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
    }
  }, [dispatch, id, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  const createOrderHandler = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: order.total_price,
          },
        },
      ],
    });
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Booking Details</h2>
              <p><strong>Name: </strong> {order.user.first_name} {order.user.last_name}</p>
              <p><strong>Email: </strong> {order.user.email}</p>
              <p>
                <strong>Status: </strong>
                {order.is_paid ? (
                  <Message variant="success">Paid on {order.paid_at.substring(0, 10)}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Service</h2>
              <Row>
                <Col md={2}>
                  <Image src={order.service.image} alt={order.service.name} fluid rounded />
                </Col>
                <Col>
                  <strong>{order.service.service_name}</strong>
                </Col>
                <Col md={4}>
                  1 x ${order.service.price} = ${order.service.price}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${order.total_price}</Col>
                </Row>
              </ListGroup.Item>

              {!order.is_paid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalScriptProvider options={{ 
                    "client-id": "ATfFVRCt0NxhlwT2ajMGeqm3aPzkz_SVi1TA2xhTfOiwPyJn2JpcFB5nd7PTcVY4FKXmN0UyvlNzfOwI",
                    currency: "USD",
                    }}>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              description: order.service.service_name,
                              amount: {
                                value: order.total_price,
                              },
                              // For Multi-merchant: This sends funds to the seller's PayPal
                              // payee: {
                              //   email_address: order.seller_paypal_email 
                              // }
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          successPaymentHandler(details);
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;