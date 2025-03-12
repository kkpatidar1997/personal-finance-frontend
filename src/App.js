// import React, { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:5000/')
//       .then(response => response.text())
//       .then(data => setMessage(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div className="container">
//       <h1>Personal Finance Visualizer</h1>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [transactions, setTransactions] = useState([]);
//   const [formData, setFormData] = useState({
//     amount: '',
//     description: '',
//     date: '',
//     category: 'Other'
//   });

//   // Fetch transactions from backend
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/transactions')
//       .then(response => setTransactions(response.data))
//       .catch(error => console.error('Error fetching transactions:', error));
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:5000/api/transactions', formData)
//       .then(response => {
//         setTransactions([...transactions, response.data]);
//         setFormData({ amount: '', description: '', date: '', category: 'Other' });
//       })
//       .catch(error => console.error('Error adding transaction:', error));
//   };

//   // Handle delete transaction
//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:5000/api/transactions/${id}`)
//       .then(() => {
//         setTransactions(transactions.filter(transaction => transaction._id !== id));
//       })
//       .catch(error => console.error('Error deleting transaction:', error));
//   };

//   return (
//     <div className="container">
//       <h1>Personal Finance Visualizer</h1>

//       {/* Add Transaction Form */}
//       <form onSubmit={handleSubmit}>
//         <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
//         <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
//         <input type="date" name="date" value={formData.date} onChange={handleChange} required />
//         <select name="category" value={formData.category} onChange={handleChange}>
//           <option value="Food">Food</option>
//           <option value="Transport">Transport</option>
//           <option value="Entertainment">Entertainment</option>
//           <option value="Shopping">Shopping</option>
//           <option value="Bills">Bills</option>
//           <option value="Other">Other</option>
//         </select>
//         <button type="submit">Add Transaction</button>
//       </form>

//       {/* Transactions List */}
//       <table>
//         <thead>
//           <tr>
//             <th>Amount</th>
//             <th>Description</th>
//             <th>Date</th>
//             <th>Category</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map(transaction => (
//             <tr key={transaction._id}>
//               <td>${transaction.amount}</td>
//               <td>{transaction.description}</td>
//               <td>{new Date(transaction.date).toLocaleDateString()}</td>
//               <td>{transaction.category}</td>
//               <td><button onClick={() => handleDelete(transaction._id)}>Delete</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Charts from './components/Charts';
// import './App.css';

// function App() {
//   const [transactions, setTransactions] = useState([]);
//   const [formData, setFormData] = useState({
//     amount: '',
//     description: '',
//     date: '',
//     category: 'Other'
//   });

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/transactions')
//       .then(response => setTransactions(response.data))
//       .catch(error => console.error('Error fetching transactions:', error));
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:5000/api/transactions', formData)
//       .then(response => {
//         setTransactions([...transactions, response.data]);
//         setFormData({ amount: '', description: '', date: '', category: 'Other' });
//       })
//       .catch(error => console.error('Error adding transaction:', error));
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:5000/api/transactions/${id}`)
//       .then(() => {
//         setTransactions(transactions.filter(transaction => transaction._id !== id));
//       })
//       .catch(error => console.error('Error deleting transaction:', error));
//   };

//   return (
//     <div className="container">
//       <h1>Personal Finance Visualizer</h1>

//       {/* Add Transaction Form */}
//       <form onSubmit={handleSubmit}>
//         <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
//         <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
//         <input type="date" name="date" value={formData.date} onChange={handleChange} required />
//         <select name="category" value={formData.category} onChange={handleChange}>
//           <option value="Food">Food</option>
//           <option value="Transport">Transport</option>
//           <option value="Entertainment">Entertainment</option>
//           <option value="Shopping">Shopping</option>
//           <option value="Bills">Bills</option>
//           <option value="Other">Other</option>
//         </select>
//         <button type="submit">Add Transaction</button>
//       </form>

//       {/* Transactions List */}
//       <table>
//         <thead>
//           <tr>
//             <th>Amount</th>
//             <th>Description</th>
//             <th>Date</th>
//             <th>Category</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map(transaction => (
//             <tr key={transaction._id}>
//               <td>${transaction.amount}</td>
//               <td>{transaction.description}</td>
//               <td>{new Date(transaction.date).toLocaleDateString()}</td>
//               <td>{transaction.category}</td>
//               <td><button onClick={() => handleDelete(transaction._id)}>Delete</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Add Charts Component */}
//       <Charts transactions={transactions} />
//     </div>
//   );
// }

// export default App;

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
    axios.get('http://localhost:5000/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/transactions', formData)
      .then(response => {
        setTransactions([...transactions, response.data]);
        setFormData({ amount: '', description: '', date: '', category: 'Other' });
      })
      .catch(error => console.error('Error adding transaction:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/transactions/${id}`)
      .then(() => {
        setTransactions(transactions.filter(transaction => transaction._id !== id));
      })
      .catch(error => console.error('Error deleting transaction:', error));
  };

  return (
    <div className="container">
      <h1>Personal Finance Visualizer</h1>
      // Add inside the return statement
     <Budget transactions={transactions} />

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
    </div>
  );
}

export default App;
