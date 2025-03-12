import React from 'react';

const Dashboard = ({ transactions }) => {
  if (!transactions.length) {
    return <h2 className="dashboard">No transactions yet.</h2>;
  }

  // Calculate total expenses
  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  // Get most recent transactions (last 3)
  const recentTransactions = transactions.slice(-3).reverse();

  // Find highest spending category
  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const highestCategory = Object.keys(categoryTotals).reduce((a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b
  );

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="summary-cards">
        {/* Total Expenses Card */}
        <div className="card">
          <h3>Total Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>

        {/* Recent Transactions Card */}
        <div className="card">
          <h3>Recent Transactions</h3>
          <ul>
            {recentTransactions.map((tx) => (
              <li key={tx._id}>
                {tx.description}: ${tx.amount}
              </li>
            ))}
          </ul>
        </div>

        {/* Highest Spending Category Card */}
        <div className="card">
          <h3>Top Category</h3>
          <p>{highestCategory} (${categoryTotals[highestCategory].toFixed(2)})</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
