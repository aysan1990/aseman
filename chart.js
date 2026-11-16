// ---------- Chart Module (Lightweight Charts) ----------
let chart = null;
let mainSeries = null;

function initChart() {
  const container = document.getElementById('chartContainer');
  if (chart) {
    chart.remove();
    chart = null;
  }

  chart = LightweightCharts.createChart(container, {
    layout: {
      background: { type: 'solid', color: '#0b0f17' },
      textColor: '#cbd5e1',
    },
    grid: {
      vertLines: { color: '#1e293b' },
      horzLines: { color: '#1e293b' },
    },
    width: container.clientWidth,
    height: 520,
    rightPriceScale: {
      borderColor: '#1e293b',
      scaleMargins: { top: 0.1, bottom: 0.1 },
    },
    timeScale: {
      borderColor: '#1e293b',
      timeVisible: true,
      secondsVisible: false,
    },
    handleScroll: true,
    handleScale: true,
  });

  mainSeries = chart.addCandlestickSeries({
    upColor: '#22c55e',
    downColor: '#ef4444',
    borderVisible: false,
    wickUpColor: '#22c55e',
    wickDownColor: '#ef4444',
    priceFormat: {
      type: 'price',
      precision: 2,
      minMove: 0.01,
    },
  });

  chart.timeScale().fitContent();

  window.addEventListener('resize', () => {
    if (chart) chart.applyOptions({ width: container.clientWidth });
  });
}

function updateChart(candles) {
  if (!mainSeries) return;
  mainSeries.setData(candles.map(c => ({
    time: c.time,
    open: c.open,
    high: c.high,
    low: c.low,
    close: c.close,
  })));
  chart.timeScale().fitContent();
}

function applyChartTool(tool) {
  // Placeholder for drawing technical analysis overlays
  // In production, this would use Lightweight Charts line/area/polygon tools
  console.log('Applying tool:', tool);
}

function drawZoneOverlay(price, color, label) {
  // Placeholder for drawing horizontal zones
  console.log('Zone:', label, price, color);
}

function drawTrendLine(points, color) {
  // Placeholder for trend lines
  console.log('Trend line:', points, color);
}
