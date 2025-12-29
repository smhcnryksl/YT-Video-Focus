const bTrans = {
  tr: { title: "🛑 Odaklanma Zamanı!", text: "Hedefine odaklan, videona geri dön!", btn: "Video Sekmesine Dön 🚀" },
  en: { title: "🛑 Focus Time!", text: "Focus on your goal, go back to your video!", btn: "Back to Video 🚀" },
  es: { title: "🛑 ¡Tiempo de Enfoque!", text: "¡Concéntrate en tu objetivo!", btn: "Volver al Video 🚀" }
};
chrome.storage.local.get(['lang'], (res) => {
  const L = res.lang || 'tr';
  const c = bTrans[L] || bTrans['tr'];
  document.getElementById('bTitle').textContent = c.title;
  document.getElementById('bText').textContent = c.text;
  document.getElementById('backBtn').textContent = c.btn;
});
document.getElementById('backBtn').onclick = () => chrome.runtime.sendMessage({ type: "goBackToVideo" });