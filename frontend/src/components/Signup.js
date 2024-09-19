import React, { useState } from "react";
import './styles.css';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeInput, setCodeInput] = useState("");

  const handleSignup = () => {
    // Simulate sending verification code via email (mocked here)
    const generatedCode = Math.floor(100000 + Math.random() * 900000);
    setVerificationCode(generatedCode.toString());
    setCodeSent(true);
    alert(`Verification code sent: ${generatedCode}`); // Replace with actual email service
  };

  const handleVerifyCode = () => {
    if (codeInput === verificationCode) {
      const newUser = { email, username, password };
      // Save user to JSON file logic
      fetch("/saveUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      alert("Signup successful!");
    } else {
      alert("Incorrect verification code");
    }
  };

  return (
    <div className="signup-container">
      {!codeSent ? (
        <div>
          <h2>Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Send Verification Code</button>
        </div>
      ) : (
        <div>
          <h2>Enter Verification Code</h2>
          <input
            type="text"
            placeholder="Verification Code"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verify and Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default Signup;
