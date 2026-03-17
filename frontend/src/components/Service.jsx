import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Service({ service }) {
  const imageSrc = service.sample_image 
    ? (service.sample_image.startsWith('http') 
        ? service.sample_image 
        : `http://127.0.0.1:8000${service.sample_image}`)
    : '/images/default.png';

  return (
    <Card className="my-3 p-3 rounded h-100 shadow-sm border-0">
      <Link to={`/detail/${service.id}`}>
        <Card.Img 
          src={imageSrc} 
          variant="top" 
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link to={`/detail/${service.id}`} className="text-decoration-none">
          <Card.Title as="div" className="text-dark">
            <strong>{service.service_name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating 
              value={service.rating} 
              text={`${service.numReviews} reviews`} 
              color={'#f8e825'}
            />
          </div>
        </Card.Text>
        
        <Card.Text as="h3" className="mt-auto text-primary">
          ${service.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Service;