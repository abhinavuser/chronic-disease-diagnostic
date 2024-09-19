import React from 'react';
import Typewriter from 'typewriter-effect';
import './styles.css'; // Import the CSS file

const Home = () => {
  return (
    <section className="home-section">
      <div className="social-media-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <div className="icon-placeholder">Instagram</div>
        </a>
        <a href="https://github.com/codechef-vit" target="_blank" rel="noopener noreferrer">
          <img src="/icons/github.png" alt="GitHub" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <div className="icon-placeholder">YouTube</div>
        </a>
      </div>

      <div className="header">
        <h2>Early diagnosis is crucial in chronic diseases, as it enables timely intervention and management</h2>
      </div>

      <div className="main-message">
        <h1>Get yourself tested for </h1>
        <div className="typewriter-effect">
          <Typewriter
            options={{
              strings: ['Diabetes', 'Alzheimers', 'Tuberculosis','HIV'],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </div>
      </div>

      <div className="scroll-down">
        <div className="icon-placeholder">↓</div>
      </div>
    </section>
  );
};

export default Home;
