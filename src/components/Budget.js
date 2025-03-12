import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';


const Budget = ({ transactions }) => {
  const [budgets, setBudgets] = useState([]);
  const [formData, setFormData] = useState({ category: '', amount: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/budgets')
      .then(response => setBudgets(response.data))
      .catch(error => console.error('Error fetching budgets:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/budgets', formData)
      .then(response => {
        setBudgets([...budgets, response.data]);
        setFormData({ category: '', amount: '' });
      })
      .catch(error => console.error('Error adding budget:', error));
  };

  // Calculate actual spending per category
  const spendingPerCategory = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  // Prepare data for budget vs. actual chart
  const chartData = budgets.map(budget => ({
    category: budget.category,
    budget: budget.amount,
    spent: spendingPerCategory[budget.category] || 0
  }));

  return (
    <div className="budget-container">
      <h2>Budgeting</h2>

      {/* Budget Form */}
      <form onSubmit={handleSubmit}>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
        </select>
        <input type="number" name="amount" placeholder="Set Budget" value={formData.amount} onChange={handleChange} required />
        <button type="submit">Set Budget</button>
      </form>

      {/* Budget vs Actual Chart */}
      <div className="chart">
        <h3>Budget vs. Actual Spending</h3>
        <BarChart width={500} height={300} data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Tooltip formatter={(value) => `$${value}`} />
          <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
          <Bar dataKey="spent" fill="#ff7300" name="Spent" />
        </BarChart>
      </div>
    </div>
  );
};

export default Budget;
