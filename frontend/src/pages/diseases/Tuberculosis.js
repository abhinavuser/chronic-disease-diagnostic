import React, { useState } from 'react';
import axios from 'axios';

function Tuberculosis() {
  const [file, setFile] = useState(null);
  const [details, setDetails] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('details', details);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading the file', error);
    }
  };

  return (
    <div>
      <h2>Tuberculosis Submission</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Upload Report:
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        <br />
        <label>
          Enter Details:
          <input 
            type="text" 
            value={details} 
            onChange={(e) => setDetails(e.target.value)} 
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {result && (
        <div>
          <h3>Result</h3>
          <p>Prediction: {result.prediction}</p>
          <p>Probability: {result.probability.toFixed(4)}</p>
          <p>Details: {result.details}</p>
        </div>
      )}
    </div>
  );
}

export default Tuberculosis;
