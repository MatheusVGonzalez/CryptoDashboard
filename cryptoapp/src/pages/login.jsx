import React, { useState } from "react";
import "../style/login.css";
import axios from 'axios';  

export default function Login() {
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Nickname:", nickName);
        console.log("Password:", password);
    

    try{
        const res = await axios.post("http://localhost:3000/login", {
            nickName : nickName,
            password : password,
        });
        console.log("sucess");
        

    }catch(err){    
        console.log(err);
        alert("Wrong Password or Email");
    }
    };

    return (
        <div className="login-container">
            <div className="card mt-5 w-50">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h1>Welcome to CryptoDash</h1>
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
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
