import React from 'react';
import "./Dashboard.css"

const Dashboard = () => {
  const storedUser = localStorage.getItem('user'); // assuming 'user' key
  const user = storedUser ? JSON.parse(storedUser) : null;
  const username = user ? user.username : 'Guest';

  const handleLogout = () => {
    localStorage.clear(); // clears all localStorage data
    // or if you want to clear only the user item:
    // localStorage.removeItem('user');
    
    // Option 1: Reload the page (to reflect logout)
    window.location.reload();

    // Option 2: Redirect to login page (uncomment if you have a login route)
    // window.location.href = '/login';
  };

  const users = [
    { id: 1, name: 'Michael Holz', dateCreated: '04/10/2013', role: 'Admin', status: 'Active', statusColor: 'green' },
    { id: 2, name: 'Paula Wilson', dateCreated: '05/08/2014', role: 'Publisher', status: 'Active', statusColor: 'green' },
    { id: 3, name: 'Antonio Moreno', dateCreated: '11/05/2015', role: 'Publisher', status: 'Suspended', statusColor: 'red' },
    { id: 4, name: 'Mary Saveley', dateCreated: '06/09/2016', role: 'Reviewer', status: 'Active', statusColor: 'green' },
    { id: 5, name: 'Martin Sommer', dateCreated: '12/08/2017', role: 'Moderator', status: 'Inactive', statusColor: 'orange' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <img src="https://quantumitinnovation.com/_next/image?url=%2Fassets%2Flogo-white.png&w=256&q=75" alt="Logo" />
        </div>
        <div className="user-info">
          <span className="username">{username}</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="dashboard-table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date Created</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.dateCreated}</td>
                <td>{user.role}</td>
                <td><span style={{ color: user.statusColor }}>{user.status}</span></td>
                <td>
                  <span className="action-icon settings">⚙️</span>
                  <span className="action-icon delete">❌</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
