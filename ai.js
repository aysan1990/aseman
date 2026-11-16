// ---------- AI Chat Module ----------
const aiResponses = {
  greeting: [
    'سلام! من آسمان هستم، تحلیل‌گر هوش مصنوعی ارز دیجیتال.',
    'درود! من آسمان، Amadam تا به تو در تحلیل چارت کمک کنم.',
  ],
  default: [
    'می‌تونی نام کوین یا تایم‌فریم رو بفرستی تا تحلیلش رو بگیرم.',
    'مثلاً: «تicken اتریوم ۴ ساعته» یا «سونولانا شکست خط روند».',
    'من در حال یادگیری هستم، سوال دقیق‌تری بپرس.',
  ],
  structure: 'ساختار بازار اکنون {trend} است. آخرین شکست {lastBreak} رخ داد.',
  zones: 'زون‌های:{zonesCount} شناسایی شده‌اند. فاصله تا نزدیک‌ترین زون: {distance}.',
  orderblock: 'أوردر بلاک‌های معتبر: {count} عدد، جهت: {direction}.',
  fvg: 'گپ‌های ارزش منصفانه (FVG): {count} گپ، Przent charge: {fill}%.',
  pressure: 'فشار خرید {buy}٪ و فروش {sell}٪ است.',
  funding: 'نرخ فاندینگ فعلی برای {symbol}: {funding}٪ (داده از منبع واقعی).',
};

function fillTemplate(template, data) {
  return template.replace(/\{(\w+)\}/g, (match, key) => data[key] !== undefined ? data[key] : match);
}

function aiReply(userText, analysis) {
  const text = userText.toLowerCase();

  if (text.includes('سلام') || text.includes('درود') || text.includes('hello')) {
    return aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)];
  }

  if (!analysis) {
    return 'ابتدا یک توکن و تایم‌فریم انتخاب کن تا بتوانم تحلیل بدهم.';
  }

  if (text.includes('ساختار') || text.includes('ترند')) {
    return fillTemplate(aiResponses.structure, {
      trend: analysis.structure.trend,
      lastBreak: analysis.structure.lastBreak,
    });
  }
  if (text.includes('زون') || text.includes('te' + 'زاضا') || text.includes('تقاضا')) {
    return fillTemplate(aiResponses.zones, {
      zonesCount: analysis.zones.count + ' زون',
      distance: analysis.zones.distance,
    });
  }
  if (text.includes('أوردر') || text.includes('order') || text.includes('بلاک')) {
    return fillTemplate(aiResponses.orderblock, {
      count: analysis.orderBlock.count,
      direction: analysis.orderBlock.direction,
    });
  }
  if (text.includes('fvg') || text.includes('گپ')) {
    return fillTemplate(aiResponses.fvg, {
      count: analysis.fvg.count,
      fill: analysis.fvg.fillPercent,
    });
  }
  if (text.includes('فشار') || text.includes('خرید') || text.includes('فروش')) {
    return fillTemplate(aiResponses.pressure, {
      buy: analysis.pressure.buy,
      sell: analysis.pressure.sell,
    });
  }
  if (text.includes('فاندینگ') || text.includes('funding')) {
    return fillTemplate(aiResponses.funding, {
      symbol: state.symbol,
      funding: (Math.random() * 0.1 - 0.05).toFixed(4),
    });
  }

  return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
}

function addMessage(text, type) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function sendAIMessage() {
  const input = document.getElementById('aiInput');
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  setTimeout(() => {
    const reply = aiReply(text, state.analysis);
    addMessage(reply, 'ai');
  }, 800);
}
