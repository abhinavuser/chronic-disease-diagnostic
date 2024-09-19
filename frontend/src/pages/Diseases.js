import React from 'react';


function Diseases() {
  return (
    <div>
      <h2>Select a Disease</h2>
      <select onChange={(e) => window.location.href = e.target.value}>
        <option value="">Choose a disease</option>
        <option value="/diseases/Diabetes">Diabetes</option>
        <option value="/diseases/Alzheimer">Alzheimer's</option>
        <option value="/diseases/Tuberculosis">Tuberculosis</option>
        <option value="/diseases/HIV">HIV</option>
      </select>
    </div>
  );
}

export default Diseases;
