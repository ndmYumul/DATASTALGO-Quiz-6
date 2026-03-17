import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Service from '../components/Service';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listServices } from '../actions/serviceActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, services } = serviceList;

  console.log('Current Services State:', services);

  useEffect(() => {
    dispatch(listServices());
  }, [dispatch]);

  return (
    <>
      <div className="py-5 text-center">
        <h1 className="fw-bold text-primary">SERENITY SPA WORKS</h1>
        <p className="text-muted">Premium Pool Access & Spa Appointments</p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {services.map((service) => (
            <Col key={service.id || service._id} sm={12} md={6}>
              <Service service={service} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;