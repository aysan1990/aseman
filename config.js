// ---------- Configuration ----------
const CONFIG = {
  siteName: 'آسمان',
  siteTitle: 'آسمان | تحلیل هوش مصنوعی ارز دیگیتال',
  
  // CoinGecko coin IDs (free API, no key required)
  coinIds: {
    bitcoin: 'bitcoin',
    ethereum: 'ethereum',
    solana: 'solana',
    ripple: 'ripple',
    cardano: 'cardano',
    dogecoin: 'dogecoin',
  },
  
  // Binance symbols (free public API, no key required)
  binanceSymbols: {
    bitcoin: 'BTCUSDT',
    ethereum: 'ETHUSDT',
    solana: 'SOLUSDT',
    ripple: 'XRPUSDT',
    cardano: 'ADAUSDT',
    dogecoin: 'DOGEUSDT',
  },
  
  // API endpoints
  endpoints: {
    coingeckoPrice: 'https://api.coingecko.com/api/v3/simple/price',
    coingeckoMarkets: 'https://api.coingecko.com/api/v3/coins/markets',
    binanceTicker: 'https://api.binance.com/api/v3/ticker/24hr',
    binanceKlines: 'https://api.binance.com/api/v3/klines',
    binanceExchangeInfo: 'https://api.binance.com/api/v3/exchangeInfo',
  },
  
  // Timeframe mapping for Binance (interval)
  binanceIntervals: {
    '15': '15m',
    '60': '1h',
    '240': '4h',
    'D': '1d',
  },
  
  // Timeframe mapping for CoinGecko (days)
  coingeckoDays: {
    '15': '1',
    '60': '1',
    '240': '1',
    'D': '30',
  },
  
  // Refresh intervals (ms)
  refreshIntervals: {
    price: 30000,      // 30 seconds
    chart: 60000,      // 1 minute
    scanner: 120000,   // 2 minutes
  },
};
