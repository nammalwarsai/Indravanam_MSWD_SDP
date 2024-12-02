import React from 'react';
import './TextSection.css'; // Ensure the path is correct
import { SwipeCarousel } from './SwipeCarousel'; // Import your SwipeCarousel component
import EncryptButton from './EncryptButton'; // Import the EncryptButton component

const TextComponent = () => {
  return (
    <div className="page-container"> {/* Added a parent div */}
      <div className="text-section">
        <div className="text-container">
          <h1 className="heading">Welcome to Our Garden!</h1>
          <p className="paragraph">
            Explore the beauty of nature and discover various plants that will enhance your outdoor space. Join us on this journey to create a vibrant and lush garden that reflects your style and personality.
          </p>
          <div className="button-container">
            <EncryptButton />
            <EncryptButton /> {/* Added second Encrypt button */}
          </div>
        </div>
        <div className="carousel-container">
          <SwipeCarousel />
        </div>
      </div>
    </div>
  );
};

export default TextComponent;
