import '../styles/pie.css';
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, TooltipProps } from 'recharts';

interface PieChartProps {}

const PieChartComponent: React.FC<PieChartProps> = () => {
  const data = [
    { name: 'Cryptocurrency', value: 25 },
    { name: 'Long-term bonds', value: 25 },
    { name: 'World stocks', value: 25 },
    { name: 'Currency, metals', value: 25 },
  ];

  const COLORS = ['#4d88b9', '#5fbb40', '#412763', '#b94db0'];

  const CustomTooltip: React.FC = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name} : ${payload[0].value}%`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='pie-container'>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={data}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;