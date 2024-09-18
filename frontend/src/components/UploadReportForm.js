import React, { useState } from 'react';
import axios from 'axios';
import './Header.css';

const UploadReportForm = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadReport = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      setResults(response.data);
    } catch (error) {
      console.error('Error uploading report:', error);
    }
  };

  return (
    <div>
      <h2>Upload Lab Report</h2>
      <form onSubmit={uploadReport}>
        <div>
          <label className="submit" htmlFor="file">Choose file:</label>
          <input type="file" id="file" onChange={onFileChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      {results && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadReportForm;
