import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { register } from '../actions/userActions';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = routerLocation.search ? routerLocation.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(formData));
    }
  };

  return (
    <Row className="justify-content-md-center mt-4">
      <Col xs={12} md={8}>
        <h1 className="text-center">Create Account</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        
        <Form onSubmit={submitHandler} className="p-4 border rounded shadow-sm bg-white">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" type="text" placeholder="John" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" type="text" placeholder="Doe" onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" type="text" placeholder="johndoe123" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="email" type="email" placeholder="email@example.com" onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control name="phone" type="text" placeholder="0917XXXXXXX" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control name="location" type="text" placeholder="City/Municipality" onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" onChange={handleChange} required>
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Min. 8 characters" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control name="confirmPassword" type="password" placeholder="Repeat password" onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary" className="w-100 py-2 fw-bold">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col className="text-center">
            Have an Account? <Link to="/signin">Login</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SignUp;