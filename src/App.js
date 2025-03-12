

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Charts from './components/Charts';
import Dashboard from './components/Dashboard';
import './App.css';
import Budget from './components/Budget';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: '',
    category: 'Other'
  });

  useEffect(() => {
    axios.get('https://personal-finance-visualise-backend2.onrender.com/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://personal-finance-visualise-backend2.onrender.com/api/transactions', formData)
      .then(response => {
        setTransactions([...transactions, response.data]);
        setFormData({ amount: '', description: '', date: '', category: 'Other' });
      })
      .catch(error => console.error('Error adding transaction:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`https://personal-finance-visualise-backend2.onrender.com/api/transactions/${id}`)
      .then(() => {
        setTransactions(transactions.filter(transaction => transaction._id !== id));
      })
      .catch(error => console.error('Error deleting transaction:', error));
  };

  return (
    <div className="container">
      <h1>Personal Finance Visualizer</h1>
      
      {/* Dashboard Section */}
      <Dashboard transactions={transactions} />

      {/* Add Transaction Form */}
      <form onSubmit={handleSubmit}>
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>

      {/* Transactions List */}
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>${transaction.amount}</td>
              <td>{transaction.description}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.category}</td>
              <td><button onClick={() => handleDelete(transaction._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Charts Section */}
      <Charts transactions={transactions} />
      // Add inside the return statement
     <Budget transactions={transactions} />

    </div>
  );
}

export default App;
