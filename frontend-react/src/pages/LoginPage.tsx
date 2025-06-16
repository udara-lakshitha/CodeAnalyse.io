import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import type { SignInRequest } from '../types/api';
import apiClient from "../api/axiosConfig";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignInRequest>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Send the API request to our Java backend's signin endpoint.
      const response = await apiClient.post('/auth/signin', formData);
      
      // 2. The backend responds with a JWT token.
      const { token } = response.data;

      // 3. Store the token in localStorage.
      // localStorage is a simple key-value store in the browser that persists even after the tab is closed.
      localStorage.setItem('jwt_token', token);

      // For debugging, let's log it.
      console.log('Login successful, token stored:', token);
      alert('Login successful!');

      // 4. After successful login, redirect the user to the dashboard.
      navigate('/dashboard');

    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div style = {{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style = {{ textAlign: 'center' }}>Login</h2>
      <form onSubmit = { handleSubmit }>
        <Input label = "Email" name = "email" type = "email" value = { formData.email } onChange = { handleChange } required />
        <Input label = "Password" name = "password" type = "password" value = { formData.password } onChange = { handleChange } required />
        <Button type = "submit">Login</Button>
        { error && <p style = {{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{ error }</p>}
      </form>
    </div>
  );
};

export default LoginPage;