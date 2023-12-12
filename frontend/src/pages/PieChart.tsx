import React from 'react';
import '../styles/pie.css';

const PieChartComponent: React.FC = () => {
  
  return (
    <div className='pie-container'>
      <div className="pie_details">
        <canvas className="my-chart"></canvas>
        <li>Python: <span className="percentages">30%</span></li>
        <li>Python: <span className="percentages">30%</span></li>
        <li>Python: <span className="percentages">30%</span></li>
        <li>Python: <span className="percentages">30%</span></li>
      </div>
    </div>
  );
};

export default PieChartComponent;