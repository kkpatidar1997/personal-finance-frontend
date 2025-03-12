import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000', '#00c49f'];

const Charts = ({ transactions }) => {
  // Group transactions by month
  const monthlyExpenses = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + transaction.amount;
    return acc;
  }, {});

  const monthlyData = Object.keys(monthlyExpenses).map(month => ({
    name: month,
    total: monthlyExpenses[month],
  }));

  // Group transactions by category
  const categoryExpenses = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryExpenses).map((category, index) => ({
    name: category,
    value: categoryExpenses[category],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="charts-container">
      <h2>Expense Visualizations</h2>

      {/* Monthly Expenses Bar Chart */}
      <div className="chart">
        <h3>Monthly Expenses</h3>
        <BarChart width={500} height={300} data={monthlyData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Category Breakdown Pie Chart */}
      <div className="chart">
        <h3>Category Breakdown</h3>
        <PieChart width={400} height={300}>
          <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Charts;
