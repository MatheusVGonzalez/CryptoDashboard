import React, { useState, useEffect, useRef } from "react";
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
  const [cryptoData, setCryptoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedCoin = cryptoData.find((coin) => coin.id === selectedCrypto);

  const cardContainerRef = useRef(null);

  const scrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setCryptoData((await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1")).data);
        console.log(cryptoData);
      }  catch (error) {
        console.error("Erro ao buscar dados do CoinGecko:", error);
      }
    }

    fetchData();

  }, []);

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


  // Filter coins based on search term
  const filteredCoins = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <h2 className="balance">$0</h2>

      <div className="carousel-wrapper">
        <button className="carousel-button left" onClick={scrollLeft}>‹</button>
        <div className="card-container" ref={cardContainerRef}>
          {filteredCoins.map((coin) => (
            <div
              key={coin.name}
              className="card"
              onClick={() => setSelectedCrypto(coin.id)}
            >
              <img src={coin.image} alt={coin.name} className="coin-image" />
              <div className="coin-name">{coin.name}</div>
              <div className="coin-price">${coin.current_price.toLocaleString()}</div>
              <div
                className={`coin-change ${
                  coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
                }`}
              >
                {coin.change >= 0 ? "+" : ""}
                {coin.price_change_percentage_24h}%
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-button right" onClick={scrollRight}>›</button>
      </div>

      <div className="chart-section">
        <div className="chart-title">Chart ({selectedCrypto})</div>
      {selectedCoin && (
        <div className="chart-value">
          ${selectedCoin.current_price.toLocaleString()} USD
        </div>
      )}

        {cryptoChartData ? (
          <Line data={cryptoChartData} options={chartOptions} />
        ) : (
          <p>Select some CrpytoCoin</p>
        )}
      </div>

    </div>
  );
}
