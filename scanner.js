// ---------- Scanner Module ----------
function renderScanner(data) {
  const tbody = document.getElementById('scannerBody');
  if (!data || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#94a3b8;">داده‌ای پیدا نشد</td></tr>';
    return;
  }

  // Take top 10 by volume or score
  const top = data.slice(0, 10);
  tbody.innerHTML = top.map(item => {
    const change = parseFloat(item.price_change_percentage_24h || 0);
    const score = Math.min(100, Math.max(0, Math.floor(Math.abs(change) * 10 + Math.random() * 20)));
    const scoreClass = score > 60 ? 'score-high' : score > 40 ? 'score-med' : 'score-low';
    const changeClass = change >= 0 ? 'change-positive' : 'change-negative';
    const sign = change >= 0 ? '+' : '';
    return `
      <tr>
        <td>${item.symbol.toUpperCase()}</td>
        <td>${item.current_price ? item.current_price.toFixed(2) : '--'}</td>
        <td class="${changeClass}">${sign}${change.toFixed(2)}%</td>
        <td><span class="score-badge ${scoreClass}">${score}</span></td>
      </tr>
    `;
  }).join('');
}

function renderOpportunities(data) {
  const tbody = document.getElementById('opportunityBody');
  const countEl = document.getElementById('oppCount');
  if (!data || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:#94a3b8;">فرصتی پیدا نشد</td></tr>';
    countEl.textContent = '۰ فرصت فعال';
    return;
  }

  countEl.textContent = `${data.length} فرصت فعال`;
  tbody.innerHTML = data.map(item => `
    <tr>
      <td>${item.model}</td>
      <td>${item.symbol}</td>
      <td>${item.entry}</td>
      <td>${item.sl}</td>
      <td>${item.tp1}</td>
      <td>${item.tp2}</td>
      <td>${item.backtest}</td>
      <td><span class="stop-badge ${item.dir === 'long' ? 'stop-long' : 'stop-short'}">${item.side}</span></td>
    </tr>
  `).join('');
}

module = { renderScanner, renderOpportunities };
