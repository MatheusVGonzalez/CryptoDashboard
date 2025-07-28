import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import CryptoDashboard from "./pages/Dashboard";
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<CryptoDashboard />} />
        <Route path='/register'element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
