import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import Input from '../components/Input';
import Button from '../components/Button';
import FormContainer from '../components/FormContainer';
import type { SignUpRequest } from '../types/api';
import { useSnackbar } from '../context/SnackbarContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState<SignUpRequest>({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiClient.post('/auth/signup', formData);
      showSnackbar('Signup successful! Please log in.', 'success');
      navigate('/login');
    } catch (err) {
      showSnackbar('Signup failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer title="Create an Account">
      <form onSubmit={handleSubmit}>
        <Input label="Name" name="name" type="text" value={formData.name} onChange={handleChange} required disabled={isLoading} />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={isLoading} />
        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required disabled={isLoading} />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>
    </FormContainer>
  );
};

export default SignupPage;