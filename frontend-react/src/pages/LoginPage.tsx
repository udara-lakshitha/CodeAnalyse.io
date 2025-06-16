import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import Input from '../components/Input';
import Button from '../components/Button';
import FormContainer from '../components/FormContainer';
import type { SignInRequest } from '../types/api';
import { useSnackbar } from '../context/SnackbarContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState<SignInRequest>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/signin', formData);
      localStorage.setItem('jwt_token', response.data.token);
      showSnackbar('Login successful!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showSnackbar('Login failed. Please check credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer title="Login">
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={isLoading} />
        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required disabled={isLoading} />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </FormContainer>
  );
};

export default LoginPage;