import React, { useState } from 'react';
import apiClient from '../api/axiosConfig';
import type { AnalysisRequest, AnalysisResponse, AnalysisResult } from '../types/api';
import Button from '../components/Button';
import ResultCard from '../components/ResultCard';

const DashboardPage = () => {
  const [code, setCode] = useState<string>('public class MyClass {\n  public void myMethod() {\n    // Paste your code here\n  }\n}');
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);
    const requestData: AnalysisRequest = { code };
    try {
      const response = await apiClient.post<AnalysisResponse>('/submissions/analyse', requestData);
      setResults(response.data.analysisResults);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError(err.response?.data?.error || 'An error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{marginTop: 0, color: '#1a202c'}}>Submit Java Code for Analysis</h2>
        <p style={{ color: '#4a5568', marginTop: '-1rem', marginBottom: '1.5rem' }}>
          Paste your Java code below. Our AI model will analyze each method and predict the probability of it containing a defect.
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: '100%',
              minHeight: '300px',
              fontFamily: 'monospace',
              fontSize: '14px',
              border: '1px solid #cbd5e0',
              borderRadius: '4px',
              padding: '1rem',
              boxSizing: 'border-box',
              resize: 'vertical',
            }}
          />
          <div style={{ marginTop: '1.5rem' }}>
            <Button type="submit" disabled={isLoading || !code}>
              {isLoading ? 'Analyzing...' : 'Analyze Code'}
            </Button>
          </div>
        </form>
      </div>

      {isLoading && <p style={{textAlign: 'center', marginTop: '2rem'}}>Analyzing, please wait...</p>}

      {error && <p style={{ color: 'red', marginTop: '2rem', textAlign: 'center', background: '#fff0f0', padding: '1rem', borderRadius: '4px' }}>Error: {error}</p>}

      {results && (
        <div style={{ marginTop: '2.5rem' }}>
          <h3 style={{ color: '#2d3748' }}>Analysis Report</h3>
          {results.length > 0 ? (
            results.map((result, index) => (
              <ResultCard key={index} result={result} />
            ))
          ) : (
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', textAlign: 'center', color: '#4a5568' }}>
              <p>No methods were found in the provided code to analyze.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;