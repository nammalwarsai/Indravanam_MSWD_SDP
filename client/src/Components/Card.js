import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ title, content }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="card shadow-sm h-100 border-0">
        <div className="card-body p-4 text-center bg-light rounded-3">
          <h5 className="card-title fw-bold text-primary mb-3">{title}</h5>
          <p className="card-text text-secondary">{content}</p>
          <button className="btn btn-primary btn-sm mt-3 shadow">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

const CardLayout = () => {
  const cardData = [
    { title: 'Elegant Design', content: 'Experience a clean and modern UI.' },
    { title: 'Responsive Layout', content: 'Optimized for all devices.' },
    { title: 'Customizable Features', content: 'Easily adapt to your needs.' },
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark">Our Features</h1>
        <p className="text-muted">
          Explore our top features crafted to provide the best user experience.
        </p>
      </div>
      <div className="row">
        {cardData.map((card, index) => (
          <Card key={index} title={card.title} content={card.content} />
        ))}
      </div>
    </div>
  );
};

export default Card;
