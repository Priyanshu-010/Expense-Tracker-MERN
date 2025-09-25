import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const categoryColors = {
  Income: '#10B981',
  Food: '#F59E0B',
  Transport: '#3B82F6',
  Entertainment: '#8B5CF6',
  Utilities: '#EF4444',
  Other: '#6B7280',
};

const CategoryChart = ({ transactions }) => {
  const expenseTransactions = transactions.filter(t => t.amount < 0);
  const categories = {};
  expenseTransactions.forEach((txn) => {
    if (!categories[txn.category]) categories[txn.category] = 0;
    categories[txn.category] += Math.abs(txn.amount);
  });

  const labels = Object.keys(categories);
  const dataValues = Object.values(categories);
  const backgroundColors = labels.map((cat) => categoryColors[cat] || '#D1D5DB');

  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          boxWidth: 12,
          font: {
            size: 14,
          },
          color: '#475569', // Slate 600
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) + '%' : '0%';
            return `${label}: ₹${value.toLocaleString('en-IN')} (${percentage})`;
          },
        },
      },
       title: {
            display: true,
            text: 'Expense Breakdown',
            font: {
                size: 18,
                weight: 'bold',
            },
            color: '#1E293B', // Slate 800
            padding: {
                bottom: 20
            }
       }
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CategoryChart;
