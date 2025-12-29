function formatTime(t) {
  let m = Math.floor(Math.max(0, t) / 60), s = Math.floor(Math.max(0, t) % 60);
  return `${m}:${s < 10 ? '0' + s : s}`;
}

const congratsTrans = {
  tr: { title: "Harika İş! ✨", text: "Videoyu başarıyla tamamladın, Tebrikler! 🏆🎉", btn: "Devam Et 🚀" },
  en: { title: "Great Job! ✨", text: "You successfully completed the video, congratulations! 🏆🎉", btn: "Continue 🚀" },
  es: { title: "¡Buen trabajo! ✨", text: "Completaste el video exitosamente, ¡felicitaciones! 🏆🎉", btn: "Continuar 🚀" }
};

function killYoutubeAutomation() {
  const player = document.getElementById('movie_player') || document.querySelector('.html5-video-player');
  if (player) {
    if (player.setAutonav) player.setAutonav(false);
    if (player.setLoop) player.setLoop(false);
  }
  const autoBtn = document.querySelector('button.ytp-autonav-toggle-button');
  if (autoBtn && autoBtn.getAttribute('aria-checked') === 'true') autoBtn.click();
}

function showCongrats() {
  chrome.storage.local.get(['lang'], (res) => {
    const L = res.lang || 'tr';
    const msg = congratsTrans[L] || congratsTrans['tr'];
    if (document.getElementById('focus-congrats-popup')) return;

    const overlay = document.createElement('div');
    overlay.id = 'focus-congrats-popup';
    overlay.style = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(15px); display: flex; align-items: center; justify-content: center; z-index: 2147483647;`;

    const card = document.createElement('div');
    card.style = `background: linear-gradient(135deg, #1b5e20 0%, #000000 100%); color: white; padding: 60px 50px; border-radius: 40px; text-align: center; box-shadow: 0 30px 60px rgba(0,0,0,0.8); font-family: sans-serif; max-width: 500px; width: 90%; border: 2px solid #43a047;`;
    card.innerHTML = `<div style="font-size: 80px; margin-bottom: 20px;">🏆</div><h1 style="margin: 0 0 20px 0; font-size: 42px; font-weight: 800;">${msg.title}</h1><p style="font-size: 22px; margin-bottom: 40px;">${msg.text}</p><button id="congrats-continue-btn" style="background: #43a047; color: white; border: none; padding: 22px 40px; border-radius: 20px; font-weight: 800; cursor: pointer; font-size: 22px; width: 100%;">${msg.btn}</button>`;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    document.getElementById('congrats-continue-btn').onclick = () => {
      chrome.storage.local.set({ active: false }, () => {
        overlay.remove();
        const cleanUrl = window.location.href.split('&list=')[0].split('?list=')[0];
        window.location.href = cleanUrl;
      });
    };
  });
}

let sessionFinished = false;
let lastVideoSrc = "";

function getPlaylistStats() {
  if (!window.location.href.includes("list=")) return null;

  const containers = document.querySelectorAll(
    'ytd-playlist-panel-video-renderer, ' +
    'ytd-playlist-video-renderer, ' +
    'ytd-rich-item-renderer'
  );

  if (containers.length === 0) return null;

  let totalSec = 0;
  let count = 0;

  containers.forEach(item => {
    const timeEl = item.querySelector(
      'span.ytd-thumbnail-overlay-time-status-renderer, ' +
      'div.ytd-thumbnail-overlay-time-status-renderer, ' +
      'div.badge-shape-wiz__text, ' +
      'ytd-thumbnail-overlay-time-status-renderer'
    );

    if (timeEl) {
      const txt = timeEl.textContent.trim();
      if (txt.includes(':') && !isNaN(parseInt(txt[0]))) {
        const parts = txt.split(':').map(Number);
        let sec = 0;
        if (parts.length === 3) sec = parts[0] * 3600 + parts[1] * 60 + parts[2];
        else if (parts.length === 2) sec = parts[0] * 60 + parts[1];

        if (sec > 0) {
          totalSec += sec;
          count++;
        }
      }
    }
  });

  if (count > 0) {
    return {
      total: totalSec,
      x125: totalSec / 1.25,
      x150: totalSec / 1.5,
      x175: totalSec / 1.75,
      x200: totalSec / 2.0,
      videoCount: count
    };
  }
  return null;
}

setInterval(() => {
  const video = document.querySelector('video');
  const plStats = getPlaylistStats();

  const msg = {
    type: "setDuration",
    duration: "--:--",
    watched: "--:--",
    playlist: plStats
  };

  if (video && !isNaN(video.duration)) {
    const speed = video.playbackRate || 1;
    const remaining = (video.duration - video.currentTime) / speed;
    const progress = Math.floor((video.currentTime / video.duration) * 100);
    const speedLabel = speed !== 1 ? ` (${speed}x)` : "";
    msg.duration = `${formatTime(remaining)} (%${progress})${speedLabel}`;
    msg.watched = formatTime(video.currentTime);
  }

  chrome.runtime.sendMessage(msg);

  chrome.storage.local.get(['active'], (res) => {
    if (video && !isNaN(video.duration) && res.active) {
      if (video.src !== lastVideoSrc) {
        lastVideoSrc = video.src;
        sessionFinished = false;
      }

      killYoutubeAutomation();

      if (!video.paused && !video.ended && video.currentTime > 0) {
        chrome.runtime.sendMessage({ type: "videoWatchedChunk", seconds: 0.5 });
      }

      if (video.currentTime >= video.duration - 1.0 && !sessionFinished) {
        sessionFinished = true;
        video.pause();
        chrome.runtime.sendMessage({ type: "videoCompleted" });
        showCongrats();
      }
    }
  });
}, 500);

function applyFocus() {
  chrome.storage.local.get(['active'], (res) => {
    const styleId = 'focus-shield-v43';
    let style = document.getElementById(styleId);

    if (res.active) {
      if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          #secondary, #comments, #related, ytd-rich-grid-renderer, ytd-browse[page-subtype="home"], 
          .ytd-watch-next-secondary-results-renderer, #chips, ytd-ad-slot-renderer, 
          #masthead-container, ytd-masthead, #subscribe-button, .ytp-upnext, #playlist, 
          ytd-playlist-panel-renderer, .ytp-show-next { display: none !important; } 
          #page-manager { margin-top: 0 !important; } 
          #primary { width: 100% !important; max-width: 1280px !important; margin: 0 auto !important; } 
          #owner, #upload-info, .ytd-video-owner-renderer, #top-row.ytd-video-secondary-info-renderer { 
            pointer-events: none !important; 
            cursor: default !important; 
          }
        `;
        document.documentElement.appendChild(style);
      }
    } else if (style) {
      style.remove();
    }
  });
}

new MutationObserver(applyFocus).observe(document.documentElement, { childList: true, subtree: true });
applyFocus();


let loopsLeft = -1;
let lastLoopUrl = "";

document.addEventListener('ended', (e) => {
  if (e.target.tagName !== 'VIDEO') return;
  const video = e.target;

  chrome.storage.local.get(['loopMode', 'loopCount'], (res) => {
    if (!res.loopMode || res.loopMode === 'off') return;

    if (res.loopMode === 'infinite') {
      video.currentTime = 0;
      video.play();
    } else if (res.loopMode === 'custom') {
      if (window.location.href !== lastLoopUrl) {
        lastLoopUrl = window.location.href;
        loopsLeft = res.loopCount || 1;
      }

      if (loopsLeft > 0) {
        loopsLeft--;
        video.currentTime = 0;
        video.play();
      }
    }
  });
}, true);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "getPageStats") {
    const video = document.querySelector('video');
    const plStats = getPlaylistStats();

    let duration = "--:--";
    let watched = "--:--";

    if (video && !isNaN(video.duration)) {
      const speed = video.playbackRate || 1;
      const remaining = (video.duration - video.currentTime) / speed;
      const progress = Math.floor((video.currentTime / video.duration) * 100);
      const speedLabel = speed !== 1 ? ` (${speed}x)` : "";
      duration = `${formatTime(remaining)} (%${progress})${speedLabel}`;
      watched = formatTime(video.currentTime);
    }

    sendResponse({
      timer: "00:00",
      duration: duration,
      watched: watched,
      playlist: plStats
    });
  }
});