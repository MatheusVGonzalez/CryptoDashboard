import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale } from "chart.js";
import "chartjs-adapter-date-fns";
import "../style/Home.css";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale);
const words = ["CryptoDashboard"];
const typingSpeed = 150;
const deletingSpeed = 80;
const pauseTime = 1000;
export default function Home() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timer;
    const currentWord = words[wordIndex];
    if (!isDeleting && charIndex <= currentWord.length) {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, charIndex));
        console.log(setText);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, charIndex));
        console.log(setText);
        setCharIndex((prev) => prev - 1);
      }, deletingSpeed);
    } else if (!isDeleting && charIndex > currentWord.length) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      console.log(setText);
      setCharIndex(0);
    }
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  //coins
  const [coinCount, setCoinCount] = useState(0);
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < 100) {
        setCoinCount(count++);
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  //chart
  const [btcData, setBtcData] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
      )
      .then((res) => {
        const { prices } = res.data;
        setBtcData({
          labels: prices.map(([timestamp]) => new Date(timestamp)),
          datasets: [
            {
              label: "BTC Price (USD)",
              data: prices.map(([, price]) => price), 
              borderColor: "#f2a900",
              backgroundColor: "rgba(242,169,0,0.1)",
              tension: 0.2,
            },
          ],
        });
      });
  }, []);

  return (
    <div className="home-container">
      <h1 className="typing">{text}</h1>
      <p className="subtitle">Join to follow the market!</p>
      <div className="buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
      <div className="stats">
        <div className="counter">
          <span className="count">{coinCount}</span>
          <span> coins tracked</span>
        </div>
        <div className="chart-placeholder">
          {btcData ? (
            <Line
              data={btcData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: { mode: "index", intersect: false },
                },
                scales: {
                  x: {
                    type: "time",
                    time: { unit: "day" },
                    ticks: { color: "#fff" },
                    grid: { color: "#333" },
                  },
                  y: {
                    ticks: { color: "#fff" },
                    grid: { color: "#333" },
                  },
                },
              }}
            />
          ) : (
            <span>Loading chart...</span>
          )}
        </div>
      </div>
    </div>
  );
}