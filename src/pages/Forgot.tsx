import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { ForgotPasswordPayload } from '../types/forgot';
import './Login.css';

const Forgot: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const payload: ForgotPasswordPayload = { email };

    try {
      const res = await api.post('/auth/forgot-password', payload);

      setMessage(res.data.message || 'Reset link sent successfully');

      // ✅ redirect to login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Forgot Password</h2>

        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send Reset Link</button>

        <Link to="/login" className="subtitle forgot-link">
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default Forgot;
