import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6}>
        <h1 className="text-center mb-4">Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className="p-4 border rounded shadow-sm bg-white">
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 py-2 fw-bold">
            Login
          </Button>
        </Form>

        <Row className="py-3">
          <Col className="text-center">
            New Customer?{' '}
            <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
              Register here
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SignIn;