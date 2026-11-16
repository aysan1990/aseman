const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & performance
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// ---------- API Routes ----------

// 1. Current price from CoinGecko
app.get('/api/price/:coinId', async (req, res) => {
  try {
    const { coinId } = req.params;
    const response = await require('axios').get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`
    );
    const coin = response.data[coinId];
    if (!coin) return res.status(404).json({ error: 'Coin not found' });
    res.json({
      price: coin.usd,
      change24h: coin.usd_24h_change || 0,
      volume: coin.usd_24h_vol || 0,
      marketCap: coin.usd_market_cap || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Candlestick / kline data from Binance
app.get('/api/klines', async (req, res) => {
  try {
    const { symbol = 'BTCUSDT', interval = '4h', limit = 300 } = req.query;
    const response = await require('axios').get(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    const data = response.data.map(k => ({
      time: new Date(k[0]).toISOString().split('T')[0],
      open: parseFloat(k[1]),
      high: parseFloat(k[2]),
      low: parseFloat(k[3]),
      close: parseFloat(k[4]),
      volume: parseFloat(k[5]),
    }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Scanner - 24hr tickers from Binance
app.get('/api/scanner', async (req, res) => {
  try {
    const response = await require('axios').get(
      'https://api.binance.com/api/v3/ticker/24hr'
    );
    const usdtPairs = response.data.filter(item => item.symbol.endsWith('USDT'));
    const scannerData = usdtPairs.map(t => ({
      symbol: t.symbol,
      current_price: parseFloat(t.lastPrice),
      price_change_percentage_24h: parseFloat(t.priceChangePercent),
    }));
    res.json(scannerData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Market data from CoinGecko (for scanner fallback)
app.get('/api/markets', async (req, res) => {
  try {
    const response = await require('axios').get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h'
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---------- Catch-all: serve index.html for SPA ----------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Aseman server running on port ${PORT}`);
});
