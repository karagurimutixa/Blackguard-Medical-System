import React from 'react';

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>User Management</h2>
      {/* Display a list of users */}
      <ul>
        {/* Example user list item */}
        <li>User Name - <button>Edit</button> <button>Delete</button></li>
      </ul>
      <button>Generate MA Invite</button>
      <h2>Appointment Overview</h2>
      {/* Display all appointments */}
      <ul>
        {/* Example appointment overview item */}
        <li>Appointment with Patient Name - <button>View Details</button></li>
      </ul>
    </div>
  );
};

export default AdminPage;
