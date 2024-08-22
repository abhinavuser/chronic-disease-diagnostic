import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [selectedDisease, setSelectedDisease] = useState('');
  const [file, setFile] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const diseases = {
    diabetes: {
      symptoms: ['Increased thirst', 'Frequent urination', 'Extreme hunger'],
      datasets: ['Blood glucose', 'HbA1c'],
      img: 'https://wallpapercave.com/wp/wp2616571.jpg',
    },
    alzheimers: {
      symptoms: ['Memory loss', 'Difficulty planning', 'Confusion'],
      datasets: ['MRI', 'PET scan'],
      img: 'https://th.bing.com/th/id/OIP.5vKLsanxy-EbmAjvEbYcKQHaE8?rs=1&pid=ImgDetMain',
    },
    tuberculosis: {
      symptoms: ['Coughing', 'Chest pain', 'Weight loss'],
      datasets: ['Sputum test', 'Chest X-ray'],
      img: 'https://images.onlymyhealth.com/imported/images/2023/October/04_Oct_2023/main%20image-image-tuberculosis.jpg',
    },
    hiv: {
      symptoms: ['Fever', 'Fatigue', 'Swollen lymph nodes'],
      datasets: ['ELISA', 'Western blot'],
      img: 'https://th.bing.com/th/id/OIP.QUXBXHU9Ocg2iwqfYJBkzgHaE6?rs=1&pid=ImgDetMain',
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % Object.keys(diseases).length);
    }, 2000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleDiseaseChange = (e) => {
    setSelectedDisease(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('disease', selectedDisease);

      try {
        const response = await axios.post('/api/upload', formData);
        console.log(response.data);
        // Handle response (e.g., display diagnosis)
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="home">
      <h1>Welcome to the Chronic Disease Diagnostic Tool</h1>
      <p>Upload your lab reports to get a diagnosis.</p>

      <div className="slideshow">
        {Object.keys(diseases).map((disease, index) => (
          <div
            key={disease}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={diseases[disease].img} alt={disease} />
            <h2>{disease.charAt(0).toUpperCase() + disease.slice(1)}</h2>
          </div>
        ))}
      </div>

      <select onChange={handleDiseaseChange} value={selectedDisease}>
        <option value="">-Select Disease-</option>
        {Object.keys(diseases).map((disease) => (
          <option key={disease} value={disease}>
            {disease.charAt(0).toUpperCase() + disease.slice(1)}
          </option>
        ))}
      </select>

      {selectedDisease && (
        <div className="disease-info">
          <h2>{selectedDisease.charAt(0).toUpperCase() + selectedDisease.slice(1)}</h2>
          <h3>Symptoms:</h3>
          <ul>
            {diseases[selectedDisease].symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
          <h3>Datasets:</h3>
          <ul>
            {diseases[selectedDisease].datasets.map((dataset, index) => (
              <li key={index}>{dataset}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HomePage;
