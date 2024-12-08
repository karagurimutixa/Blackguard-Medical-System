import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <button>Login with Discord</button>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <a href="/register">Register</a>
    </div>
  );
};

export default LoginPage;
