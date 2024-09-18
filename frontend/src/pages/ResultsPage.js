import React from 'react';
import './Results.css';

const ResultsPage = ({ results }) => {
  return (
    <div className="results-container">
      <h1>Diagnostic Results</h1>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className="result-card">
            <h2>{result.disease}</h2>
            <p>{result.description}</p>
          </div>
        ))
      ) : (
        <p>No results to display.</p>
      )}
    </div>
  );
};

export default ResultsPage;
