import React from 'react';

const Card = ({ title, content }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white/70 backdrop-blur-md p-6 m-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">{content}</p>
    </div>
  );
};

const CardLayout = () => {
  const cardData = [
    { title: 'Card 1', content: 'This is the first card.' },
    { title: 'Card 2', content: 'This is the second card.' },
    { title: 'Card 3', content: 'This is the third card.' },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {cardData.map((card, index) => (
        <Card key={index} title={card.title} content={card.content} />
      ))}
    </div>
  );
};

export default CardLayout;