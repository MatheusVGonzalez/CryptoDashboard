import React, { useState } from "react";
import "../style/login.css";
import axios from "axios";

export default function Register() {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:3000/register", {
        nickName,
        password,
      });
      alert("successful!");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("This user already exist");
    }
  };

  return (
    <div className="login-container">
      <div className="card mt-5 w-50">
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <h1>Register</h1>
            <div className="form-group">
              <label htmlFor="nickName">Email</label>
              <input
                type="text"
                className="form-control"
                id="nickName"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={() => window.history.back()}>Back</button>            
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
