import React from 'react';
import type { AnalysisResult } from '../types/api';

interface ResultCardProps {
  result: AnalysisResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const probability = parseFloat(result.defectProbability);
  const riskColor = probability > 50 ? '#e53e3e' : probability > 20 ? '#dd6b20' : '#38a169';
  const riskLevel = probability > 50 ? 'High' : probability > 20 ? 'Medium' : 'Low';

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderLeft: `5px solid ${riskColor}`,
      padding: '1rem 1.5rem',
      marginBottom: '1rem',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <p style={{ margin: 0, fontWeight: '600', color: '#2d3748' }}>{result.methodName}</p>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#718096' }}>
          Defect Probability
        </p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: riskColor }}>
          {result.defectProbability}
        </p>
        <p style={{ margin: '0.25rem 0 0', color: riskColor, fontSize: '0.875rem' }}>{riskLevel} Risk</p>
      </div>
    </div>
  );
};

export default ResultCard;