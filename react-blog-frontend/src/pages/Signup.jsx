import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api'; // Import your API function

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(name, email, password);
      console.log('Signup successful:', data);
      setSuccess('Signup successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful signup
      }, 2000);
    } catch (err) {
      setError('Email already registered. OR Incorrect Email and Password');
      setTimeout(() => {
        setError('');
      }, 4000);
    }
  };

  return (
    <div className="page-background page-background-top-left signup">
      <div className="form-container">
        <form  onSubmit={handleSubmit} className="inner-container mb-2 p-2">
        <h1 className="form-title" >Signup</h1>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
          {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}
          <button type="submit" className="button m-2">Signup</button>
          <Link to="/login" className="login-link">Already have an account? Login here.</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
