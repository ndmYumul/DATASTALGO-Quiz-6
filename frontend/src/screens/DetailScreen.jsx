import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listServiceDetails } from '../actions/serviceActions';
import { createOrder } from '../actions/orderActions';

const DetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const serviceDetails = useSelector((state) => state.serviceDetails);
  const { loading, error, service } = serviceDetails;

  useEffect(() => {
    dispatch(listServiceDetails(id));
  }, [dispatch, id]);

  const addToBookingHandler = () => {
    dispatch(createOrder({
        service: service.id,
        total_price: service.price,
    }));
  };

  // Safety Check: If loading is false but service is still empty, 
  // or if we are currently loading, show the Loader.
  if (loading || !service || !service.service_name) {
    return <Loader />;
  }

  const imageSrc = service.sample_image 
    ? (service.sample_image.startsWith('http') 
        ? service.sample_image 
        : `http://127.0.0.1:8000${service.sample_image}`)
    : '/images/default.png';

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={imageSrc} alt={service.service_name} fluid rounded />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h3>{service.service_name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className="d-flex align-items-center">
                        <Rating
                            value={service.rating}
                            color={'#f8e825'}
                        />
                        <span className="ms-2">
                            ({service.num_reviews} {service.num_reviews === 1 ? 'review' : 'reviews'})
                        </span>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${service.price}</ListGroup.Item>
                <ListGroup.Item>
                    Description: {service.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${service.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {/* Check your backend field name: is_available or count_in_stock */}
                      {service.is_available !== false ? 'Available' : 'Fully Booked'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    onClick={addToBookingHandler}
                    className="btn-block w-100"
                    type="button"
                    disabled={!service.is_available}
                  >
                    {service.service_name === 'Spa' ? 'Book Appointment' : 'Get Access'}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default DetailScreen;