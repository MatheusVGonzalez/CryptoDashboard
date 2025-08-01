# 💹 CryptoDashboard

**CryptoDashboard** is a full-stack cryptocurrency tracking app that allows users to:
- 🔐 Register and login securely  
- 📈 View real-time charts for 50+ cryptocurrencies  
- 🔍 Search and filter coins  
- 💳 Add virtual funds to their account  
- 📰 Stay updated with live crypto news
  
> Built with React, Node.js, Express, and CoinGecko API.

---

## 🚀 Demo

<img width="1856" height="858" alt="image" src="https://github.com/user-attachments/assets/cf91fb29-3434-4819-8749-94a3e40d3c04" />
<img width="1810" height="609" alt="image" src="https://github.com/user-attachments/assets/4575b459-16ba-40b4-a489-7ca3659d2190" />
<img width="1839" height="830" alt="image" src="https://github.com/user-attachments/assets/dabe8c06-4630-4c4f-b1c1-8d6dbd3468fe" />


---

## 🧰 Tech Stack

### Frontend:
- React
- React Router
- Axios
- Chart.js
- CoinGecko API
- CryptoPanic News Widget

### Backend:
- Node.js
- Express
- JSON-based storage (`user.json` for user data)

---

## 📦 Features

- **Authentication:** Simple login/register system using localStorage  
- **Balance System:** Users can simulate adding funds to their balance  
- **Dynamic Charting:** Coin price history from CoinGecko API  
- **Coin Filtering:** Real-time search and horizontal coin carousel  
- **Crypto News Widget:** Embedded news feed from CryptoPanic  
- **Typing Animation:** Typewriter effect on the homepage  
- **Smart Caching:** Prevents API rate limits using chart data caching

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cryptodashboard.git
cd cryptodashboard
```
Start the Backend (Node.js + Express)

```bash
cd backend
npm install
node server.js
```

Start the Frontend (React)
```bash
cd frontend
npm install
npm start
```
