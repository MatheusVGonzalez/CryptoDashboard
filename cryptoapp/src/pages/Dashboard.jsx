import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "../style/Dashboard.css";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const cryptoData = [
  { name: "Bitcoin", price: 52291, change: +0.25, symbol: "BTC" },
  { name: "Litecoin", price: 8291, change: +0.25, symbol: "LTC" },
  { name: "Ethereum", price: 28291, change: +0.25, symbol: "ETH" },
  { name: "Solana", price: 14291, change: -0.25, symbol: "SOL" },
];

const chartDataRaw = [
  { time: "20:00", value: 28000 },
  { time: "20:10", value: 39000 },
  { time: "20:20", value: 32000 },
  { time: "20:30", value: 41000 },
  { time: "20:40", value: 47000 },
  { time: "20:50", value: 48000 },
];

const generateChartData = () => ({
  labels: chartDataRaw.map((d) => d.time),
  datasets: [
    {
      label: "Price",
      data: chartDataRaw.map((d) => d.value),
      fill: false,
      borderColor: "#facc15",
      tension: 0.4,
    },
  ],
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        color: "#ccc",
      },
    },
    x: {
      ticks: {
        color: "#ccc",
      },
    },
  },
};

export default function CryptoDashboard() {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [cryptoChartData, setCryptoChartData] = useState(null);
  const [selectedDays, setSelectedDays] = useState(7);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${selectedCrypto.toLowerCase()}/market_chart?vs_currency=usd&days=${selectedDays}`
      );

      const prices = res.data.prices;

      setCryptoChartData({
        labels: prices.map(([timestamp]) => new Date(timestamp).toLocaleDateString("en-US")),
        datasets: [
          {
            label: `${selectedCrypto} Price (USD)`,
            data: prices.map(([_, price]) => price),
            borderColor: "#facc15",
            backgroundColor: "rgba(250, 204, 21, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Erro ao buscar dados do CoinGecko:", error);
    }
  };

  fetchData();
}, [selectedCrypto]);


  return (
    <div className="dashboard-container">
      <header className="header">
        <h1 className="header-title">Dashboard</h1>
        <div className="search-bar">
          <span className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 48 48">
                <path fill="currentColor" d="M46.8 42.798 36.134 32.135a19.7 19.7 0 0 0 3.949-11.853C40.084 9.363 31.2.48 20.282.48S.48 9.363.48 20.282s8.883 19.802 19.802 19.802a19.7 19.7 0 0 0 11.853-3.949L42.798 46.8a2.834 2.834 0 0 0 4.001-4M6.137 20.282a14.144 14.144 0 1 1 14.144 14.144A14.16 14.16 0 0 1 6.138 20.282"></path>
            </svg></span>
          <input
            type="text"
            className="search-input"
            placeholder="Search"
          />
        </div>
      </header>

      <h2 className="balance">$154,610.00</h2>

      <div className="card-container">
        {cryptoData.map((coin) => (
          <div
            key={coin.name}
            className="card"
            onClick={() => setSelectedCrypto(coin.symbol)}
          >
            <div className="coin-name">{coin.name}</div>
            <div className="coin-price">${coin.price.toLocaleString()}</div>
            <div
              className={`coin-change ${
                coin.change >= 0 ? "positive" : "negative"
              }`}
            >
              {coin.change >= 0 ? "+" : ""}
              {coin.change}%
            </div>
          </div>
        ))}
      </div>

      <div className="chart-section">
        <div className="chart-title">Chart ({selectedCrypto})</div>
        <div className="chart-value">$38,252.02</div>
        {cryptoChartData ? (
          <Line data={cryptoChartData} options={chartOptions} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

        console.log({selectedCrypto});
    </div>
  );
}