// ---------- API Layer (Real Data from Free Sources) ----------
// Sources: CoinGecko (no key), Binance Public API (no key)

class CryptoAPI {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 60000; // 1 minute cache
  }

  // Helper: cached fetch
  async _fetchWithCache(url, ttl = this.cacheTimeout) {
    const now = Date.now();
    if (this.cache.has(url) && now - this.cache.get(url).time < ttl) {
      return this.cache.get(url).data;
    }
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    this.cache.set(url, { time: now, data });
    return data;
  }

  // Get current price + 24h change from CoinGecko
  async getPrice(coinId) {
    const url = `${CONFIG.endpoints.coingeckoPrice}?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`;
    const data = await this._fetchWithCache(url, 30000);
    const coin = data[coinId];
    if (!coin) throw new Error(`Coin ${coinId} not found`);
    return {
      price: coin.usd,
      change24h: coin.usd_24h_change || 0,
      volume: coin.usd_24h_vol || 0,
      marketCap: coin.usd_market_cap || 0,
    };
  }

  // Get candlestick/kline data from Binance
  async getKlines(symbol, interval, limit = 300) {
    const url = `${CONFIG.endpoints.binanceKlines}?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    const data = await this._fetchWithCache(url, 60000);
    return data.map(k => ({
      time: new Date(k[0]).toISOString().split('T')[0],
      open: parseFloat(k[1]),
      high: parseFloat(k[2]),
      low: parseFloat(k[3]),
      close: parseFloat(k[4]),
      volume: parseFloat(k[5]),
    }));
  }

  // Get 24hr ticker for scanner
  async getTickers() {
    const url = `${CONFIG.endpoints.binanceTicker}`;
    const data = await this._fetchWithCache(url, 60000);
    // Filter USDT pairs only
    return data.filter(item => item.symbol.endsWith('USDT'));
  }

  // Get market data from CoinGecko for scanner
  async getMarkets(vsCurrency = 'usd', order = 'market_cap_desc', perPage = 100, page = 1) {
    const url = `${CONFIG.endpoints.coingeckoMarkets}?vs_currency=${vsCurrency}&order=${order}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`;
    return await this._fetchWithCache(url, 120000);
  }

  // Get trending coins
  async getTrending() {
    const url = 'https://api.coingecko.com/api/v3/search/trending';
    return await this._fetchWithCache(url, 300000);
  }
}

// Singleton instance
const api = new CryptoAPI();
