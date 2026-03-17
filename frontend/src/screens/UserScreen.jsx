import React, { useState, useEffect } from 'react';
import { Table, Button, Tabs, Tab, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, approveSeller, declineSeller } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserScreen = () => {
    const dispatch = useDispatch();

    const [showApprove, setShowApprove] = useState(false);
    const [showDecline, setShowDecline] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [merchantId, setMerchantId] = useState('');
    const [reason, setReason] = useState('');

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);

    const handleApproveOpen = (user) => {
        setSelectedUser(user);
        setShowApprove(true);
    };

    const handleDeclineOpen = (user) => {
        setSelectedUser(user);
        setShowDecline(true);
    };

    const confirmApprove = () => {
        dispatch(approveSeller(selectedUser.id, merchantId));
        setShowApprove(false);
        setMerchantId('');
    };

    const confirmDecline = () => {
        // dispatch(declineSeller(selectedUser.id, reason));
        setShowDecline(false);
        setReason('');
    };

    return (
        <div className="mt-4">
            <h1>Admin Management</h1>
            <Tabs defaultActiveKey="users" className="mb-3">
                <Tab eventKey="users" title="All Users">
                    <Table striped bordered hover responsive className="table-sm shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>FIRST NAME</th>
                                <th>LAST NAME</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.filter(u => u.role !== 'Seller').map(user => (
                                <tr key={user.id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Button variant="light" size="sm"><i className="fas fa-edit"></i></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>

                <Tab eventKey="applications" title="Seller Applications">
                    <Table striped bordered hover responsive className="table-sm shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* In a real setup, filter for users who have a "Pending" status */}
                            {users && users.filter(u => u.is_applying).map(user => (
                                <tr key={user.id}>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button variant="success" size="sm" onClick={() => handleApproveOpen(user)}>Approve</Button>
                                        <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDeclineOpen(user)}>Decline</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>

            {/* Approve Modal */}
            <Modal show={showApprove} onHide={() => setShowApprove(false)}>
                <Modal.Header closeButton><Modal.Title>Approve Seller</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Assign PayPal Merchant ID</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={merchantId} 
                            onChange={(e) => setMerchantId(e.target.value)} 
                            placeholder="Example: ZY7W..."
                        />
                        <Form.Text className="text-muted">This allows payments to go directly to this seller.</Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={confirmApprove}>Confirm Approval</Button>
                </Modal.Footer>
            </Modal>

            {/* Decline Modal */}
            <Modal show={showDecline} onHide={() => setShowDecline(false)}>
                <Modal.Header closeButton><Modal.Title>Decline Application</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Reason for Decline</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)} 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={confirmDecline}>Send Decline</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserScreen;