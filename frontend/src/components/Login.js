import React, { useState } from "react";
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Fetch user from users.json
    fetch("/getUsers")
      .then((res) => res.json())
      .then((data) => {
        const user = data.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          alert("Login successful");
          // Proceed to application
        } else {
          alert("Invalid credentials or user does not exist. Please sign up.");
        }
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
