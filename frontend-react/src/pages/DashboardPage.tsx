import React, { useState } from 'react';
import apiClient from '../api/axiosConfig'; // Import our new authenticated client
import type { AnalysisRequest, AnalysisResponse, AnalysisResult } from '../types/api';
import Button from '../components/Button';

const DashboardPage = () => {
  // State to hold the Java code the user pastes in
  const [code, setCode] = useState<string>('');
  // State to hold the analysis results we get back from the API
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  // State for loading and error messages
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    const requestData: AnalysisRequest = { code };

    try {
      // Use our 'apiClient' which automatically adds the auth token!
      const response = await apiClient.post<AnalysisResponse>('/submissions/analyse', requestData);
      
      setResults(response.data.analysisResults);

    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError(err.response?.data?.error || 'An error occurred during analysis.');
    } finally {
      // This block runs whether the try succeeded or failed
      setIsLoading(false);
    }
  };

  return (
    <div style = {{ maxWidth: '800px', margin: '2rem auto' }}>
      <h2>Submit Java Code for Analysis</h2>
      <form onSubmit = {handleSubmit}>
        <textarea
          value = {code}
          onChange = {(e) => setCode(e.target.value)}
          placeholder = "Paste your Java code here..."
          style = {{ 
            width: '100%', 
            minHeight: '250px', 
            fontFamily: 'monospace', 
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <Button type = "submit" disabled = {isLoading} style = {{ marginTop: '1rem' }}>
          { isLoading ? 'Analyzing...' : 'Analyze Code' }
        </Button>
      </form>

      { error && <p style = {{ color: 'red', marginTop: '1rem' }}>Error: { error }</p>}

      { results && (
        <div style = {{ marginTop: '2rem' }}>
          <h3>Analysis Results</h3>
          <ul style = {{ listStyleType: 'none', padding: 0 }}>
            {results.map((result, index) => (
              <li key = {index} style = {{ background: '#f9f9f9', border: '1px solid #eee', padding: '1rem', marginBottom: '0.5rem', borderRadius: '4px' }}>
                <strong>Method:</strong> {result.methodName} <br />
                <strong>Defect Probability:</strong> 
                <span style = {{ color: parseFloat(result.defectProbability) > 50 ? 'red' : 'green', fontWeight: 'bold' }}>
                  {' '}{ result.defectProbability }
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;