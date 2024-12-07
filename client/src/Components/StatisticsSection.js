import React from 'react';
import { FaTree, FaUsers, FaChartLine } from 'react-icons/fa';

const StatisticsSection = () => {
  const statsData = [
    {
      icon: <FaTree />,
      title: 'Gardens Planned',
      value: 50,
    },
    {
      icon: <FaUsers />,
      title: 'Happy Customers',
      value: 100,
    },
    {
      icon: <FaChartLine />,
      title: 'Garden Area Created',
      value: '1000 m²',
    },
  ];

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">Our Achievements</h2>
        <p className="text-muted fs-5">
          Numbers that reflect our dedication and milestones.
        </p>
      </div>
      <div className="row g-4 justify-content-center">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`col-12 col-md-4 ${index === 1 ? '' : 'offset-md-0'}`}
          >
            <div
              className="card shadow border-0 h-100 text-center"
              style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div className="card-body py-5">
                <div className="mb-4 text-primary" style={{ fontSize: '60px' }}>
                  {stat.icon}
                </div>
                <h5 className="card-title text-dark fw-bold">{stat.title}</h5>
                <p className="card-text text-success fs-3 fw-semibold">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
