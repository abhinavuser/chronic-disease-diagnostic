import React, { useState } from 'react';

function Diabetes() {
  const [file, setFile] = useState(null);
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('File:', file);
    console.log('Details:', details);
  };

  return (
    <div>
      <h2>Diabetes Submission</h2>
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
    </div>
  );
}

export default Diabetes;
