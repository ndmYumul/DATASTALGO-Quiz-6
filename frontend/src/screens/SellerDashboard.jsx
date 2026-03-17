import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listServices } from '../actions/serviceActions'; // Filtered by seller on backend
import Loader from '../components/Loader';
import Message from '../components/Message';

const SellerDashboard = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const serviceList = useSelector((state) => state.serviceList);
    const { loading, error, services } = serviceList;

    useEffect(() => {
        if (!userInfo || (userInfo.role !== 'Seller' && userInfo.role !== 'Admin')) {
            navigate('/signin');
        } else {
            dispatch(listServices()); // Pass user ID or handle filtering in Django
        }
    }, [dispatch, navigate, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(createService({ name, price, description, duration }))
        setShow(false);
    };

    return (
        <div className="mt-4">
            <Row className="align-items-center mb-3">
                <Col>
                    <h1>Seller Dashboard</h1>
                </Col>
                <Col className="text-end">
                    <Button onClick={() => setShow(true)}>
                        <i className="fas fa-plus"></i> Add New Service
                    </Button>
                </Col>
            </Row>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm bg-white shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>DURATION</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id}>
                                <td>{service.service_name}</td>
                                <td>${service.price}</td>
                                <td>{service.duration || '1 hr'}</td>
                                <td>
                                    <Button variant="light" size="sm"><i className="fas fa-edit"></i></Button>
                                    <Button variant="danger" size="sm" className="ms-2"><i className="fas fa-trash"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Add Service Modal */}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-2">
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Price ($)</Form.Label>
                            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 60 mins" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Button type="submit" variant="primary">Create Service</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SellerDashboard;