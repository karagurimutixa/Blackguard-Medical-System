import React from 'react';

const RegisterPage = () => {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="Medical Affairs Username" required />
        <input type="text" placeholder="Discord Username" required />
        <input type="text" placeholder="Discord User ID" required />
        <input type="text" placeholder="Roblox Username" required />
        <input type="text" placeholder="Roblox User Link" required />
        <input type="text" placeholder="MA Invite" required />
        <input type="password" placeholder="Password" required />
        <input type="email" placeholder="Email" required />
        <button type="submit">Register</button>
      </form>
      <a href="/">Login</a>
    </div>
  );
};

export default RegisterPage;
