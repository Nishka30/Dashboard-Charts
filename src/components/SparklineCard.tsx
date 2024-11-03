import React from 'react';
import Chart from 'react-apexcharts';
import { Users } from 'lucide-react';

interface SparklineCardProps {
  title: string;
  total: number;
  data: number[];
  color: string;
}

export const SparklineCard: React.FC<SparklineCardProps> = ({ title, total, data, color }) => {
  const options = {
    chart: {
      type: 'line',
      sparkline: { enabled: true },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: [color],
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      marker: { show: false },
    },
  };

  const series = [{ data }];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Users className={`text-${color}-600`} size={24} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold">{total.toLocaleString()}</p>
        </div>
      </div>
      <div className="h-16">
        <Chart
          options={options}
          series={series}
          type="line"
          height="100%"
        />
      </div>
    </div>
  );
};