import React from 'react';

const DoctorPage = () => {
  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <h2>Patient List</h2>
      {/* Display a list of patients assigned to the doctor */}
      <ul>
        {/* Example patient list item */}
        <li>Patient Name - <button>View Details</button></li>
      </ul>
      <button>Create Appointment</button>
      <h2>Manage Appointments</h2>
      {/* Display all appointments with options to view, edit, or cancel */}
      <ul>
        {/* Example appointment list item */}
        <li>Appointment with Patient Name - <button>Edit</button> <button>Cancel</button></li>
      </ul>
      <button>Send Patient Invite</button>
    </div>
  );
};

export default DoctorPage;
