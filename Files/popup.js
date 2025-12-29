const trans = {
  tr: {
    start: "ODAKLANMAYI BAŞLAT 🚀", stop: "ODAKLANMAYI DURDUR 🏁", elapsed: "Toplam Çalışma:", video: "Kalan Video Süresi:", watched: "İzlenen Video Süresi:",
    pPlaceholder: "Yeni liste adı (İş, Okul...)", lPlaceholder: "Örn: instagram.com (Enter)",
    bLabel: "Mod: Kara Liste (E)", wLabel: "Mod: Beyaz Liste (İ)",
    bShort: "KL", wShort: "BL", defaultP: "Varsayılan", listBtn: "Listeleri Yönet 📋",
    bName: "Kara Liste", wName: "Beyaz Liste",
    createList: "Yeni Liste Oluştur", selectList: "Düzenlenecek Listeyi Seç", addSites: "Listeye Site Ekle",
    guide: null,
    statsBtn: "İstatistikler 📊",
    shortsOn: "Shorts: Gizli 🙈", shortsOff: "Shorts: Görünür 📺",
    dev: "Geliştirici",
    playlist: "Oynatma Listesi:",
    units: { h: 'sa', m: 'dk', s: 'sn' },
    warnVideo: "Lütfen önce bir YouTube videosu açın!",
    warnExist: "Bu liste adı zaten var!",
    warnLast: "En az bir liste kalmalı!",
    warnDefault: "Varsayılan liste silinemez!",
    confirmDel: "Bu listeyi silmek istediğinize emin misiniz: "
  },
  en: {
    start: "START FOCUSING 🚀", stop: "STOP FOCUSING 🏁", elapsed: "Total Focus Time:", video: "Remaining Video:", watched: "Watched Video Time:",
    pPlaceholder: "New list name (Work, Study...)", lPlaceholder: "e.g. instagram.com (Enter)",
    bLabel: "Mode: Blacklist (B)", wLabel: "Mode: Whitelist (W)",
    bShort: "B", wShort: "W", defaultP: "Default", listBtn: "Manage Lists 📋",
    bName: "Blacklist", wName: "Whitelist",
    createList: "Create New List", selectList: "Select List to Edit", addSites: "Add Sites to List",
    guide: null,
    statsBtn: "Statistics 📊",
    shortsOn: "Shorts: Hidden 🙈", shortsOff: "Shorts: Visible 📺",
    dev: "Developer",
    playlist: "Playlist Info:",
    units: { h: 'h', m: 'm', s: 's' },
    warnVideo: "Please open a YouTube video first!",
    warnExist: "This list name already exists!",
    warnLast: "You must have at least one list!",
    warnDefault: "Default list cannot be deleted!",
    confirmDel: "Are you sure you want to delete list: "
  },
  es: {
    start: "INICIAR ENFOQUE 🚀", stop: "DETENER ENFOQUE 🏁", elapsed: "Tiempo de Trabajo:", video: "Video Restante:", watched: "Tiempo Visto:",
    pPlaceholder: "Nombre de lista (Trabajo, Estudio...)", lPlaceholder: "Ej: tiktok.com (Enter)",
    bLabel: "Modo: Lista Negra (L)", wLabel: "Modo: Lista Blanca (P)",
    bShort: "LN", wShort: "LB", defaultP: "Predeterminado", listBtn: "Gestionar Listas 📋",
    bName: "Lista Negra", wName: "Lista Blanca",
    createList: "Crear Nueva Lista", selectList: "Seleccionar Lista", addSites: "Añadir Sitios a la Lista",
    guide: null,
    statsBtn: "Estadísticas 📊",
    shortsOn: "Shorts: Oculto 🙈", shortsOff: "Shorts: Visible 📺",
    dev: "Desarrollador",
    playlist: "Info. Lista:",
    units: { h: 'h', m: 'm', s: 's' },
    warnVideo: "¡Por favor, abre un video de YouTube primero!",
    warnExist: "¡Este nombre de lista ya existe!",
    warnLast: "¡Debes tener al menos una lista!",
    warnDefault: "¡La lista predeterminada no se puede eliminar!",
    confirmDel: "¿Estás seguro de que quieres eliminar la lista: "
  }
};

let storage = {};

function formatDuration(seconds, L = 'en') {
  if (!seconds && seconds !== 0) return "--:--";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const t = trans[L] || trans['en'];
  const u = t.units;

  if (h > 0) return `${h}${u.h} ${m}${u.m}`;
  if (m > 0) return `${m}${u.m} ${s}${u.s}`;
  return `${s}${u.s}`;
}

function updateUI() {
  chrome.storage.local.get(null, (res) => {
    storage = res;
    const L = res.lang || 'en';

    const currentPName = storage.currentProfile;
    const knownDefaults = ["Varsayılan", "Default", "Predeterminado", "Varsayılan Liste", "Default List", "Lista Predeterminada"];
    const targetDefault = trans[L].defaultP;

    let existingDefaultKey = Object.keys(storage.profiles).find(k => knownDefaults.includes(k));

    if (existingDefaultKey) {
      if (existingDefaultKey !== targetDefault) {
        storage.profiles[targetDefault] = storage.profiles[existingDefaultKey];
        delete storage.profiles[existingDefaultKey];
        if (storage.currentProfile === existingDefaultKey) {
          storage.currentProfile = targetDefault;
        }
        chrome.storage.local.set({ profiles: storage.profiles, currentProfile: storage.currentProfile });
      }
    } else {
      storage.profiles[targetDefault] = {
        list: [
          "facebook.com", "instagram.com", "tiktok.com", "x.com", "twitter.com",
          "reddit.com", "pinterest.com", "threads.net", "tumblr.com", "vk.com",
          "ok.ru", "snapchat.com", "netflix.com", "twitch.tv", "disneyplus.com",
          "hulu.com", "primevideo.com", "max.com", "paramountplus.com", "vimeo.com",
          "dailymotion.com", "rumble.com", "bitchute.com", "bilibili.com", "iq.com",
          "crunchyroll.com", "discord.com", "telegram.org", "messenger.com", "whatsapp.com",
          "roblox.com", "steampowered.com", "epicgames.com", "minecraft.net", "ign.com",
          "gamespot.com", "kotaku.com", "battle.net", "origin.com", "chess.com",
          "lichess.org", "9gag.com", "imgur.com", "giphy.com", "flickr.com",
          "deviantart.com", "ifunny.co", "imdb.com", "buzzfeed.com", "fandom.com",
          "rottentomatoes.com", "tmz.com", "eonline.com", "billboard.com", "variety.com",
          "hollywoodreporter.com", "vice.com", "wired.com", "amazon.com", "ebay.com",
          "aliexpress.com", "etsy.com", "temu.com", "shein.com", "quora.com",
          "wattpad.com", "archiveofourown.org", "goodreads.com", "zillow.com", "tripadvisor.com",
          "booking.com", "espn.com", "bleacherreport.com", "nfl.com", "nba.com",
          "mlb.com", "nhl.com", "goal.com", "metacritic.com", "letterboxd.com",
          "knowyourmeme.com", "urbanusername.com", "boredpanda.com", "cracked.com", "theonion.com",
          "mashable.com", "techcrunch.com", "theverge.com", "engadget.com", "gizmodo.com",
          "lifehacker.com", "kotaku.com", "polygon.com", "pcgamer.com", "eurogamer.net",
          "rockpapershotgun.com", "gamesradar.com", "destructoid.com", "giantbomb.com", "shacknews.com"
        ],
        type: "blacklist"
      };
      if (!storage.profiles[storage.currentProfile]) {
        storage.currentProfile = targetDefault;
      }
      chrome.storage.local.set({ profiles: storage.profiles, currentProfile: storage.currentProfile });
    }

    if (!storage.defaultListVersion || storage.defaultListVersion < 1) {
      let defKey = Object.keys(storage.profiles).find(k => knownDefaults.includes(k));
      if (defKey) {
        storage.profiles[defKey].list = [
          "facebook.com", "instagram.com", "tiktok.com", "x.com", "twitter.com",
          "reddit.com", "pinterest.com", "threads.net", "tumblr.com", "vk.com",
          "ok.ru", "snapchat.com", "netflix.com", "twitch.tv", "disneyplus.com",
          "hulu.com", "primevideo.com", "max.com", "paramountplus.com", "vimeo.com",
          "dailymotion.com", "rumble.com", "bitchute.com", "bilibili.com", "iq.com",
          "crunchyroll.com", "discord.com", "telegram.org", "messenger.com", "whatsapp.com",
          "roblox.com", "steampowered.com", "epicgames.com", "minecraft.net", "ign.com",
          "gamespot.com", "kotaku.com", "battle.net", "origin.com", "chess.com",
          "lichess.org", "9gag.com", "imgur.com", "giphy.com", "flickr.com",
          "deviantart.com", "ifunny.co", "imdb.com", "buzzfeed.com", "fandom.com",
          "rottentomatoes.com", "tmz.com", "eonline.com", "billboard.com", "variety.com",
          "hollywoodreporter.com", "vice.com", "wired.com", "amazon.com", "ebay.com",
          "aliexpress.com", "etsy.com", "temu.com", "shein.com", "quora.com",
          "wattpad.com", "archiveofourown.org", "goodreads.com", "zillow.com", "tripadvisor.com",
          "booking.com", "espn.com", "bleacherreport.com", "nfl.com", "nba.com",
          "mlb.com", "nhl.com", "goal.com", "metacritic.com", "letterboxd.com",
          "knowyourmeme.com", "urbanusername.com", "boredpanda.com", "cracked.com", "theonion.com",
          "mashable.com", "techcrunch.com", "theverge.com", "engadget.com", "gizmodo.com",
          "lifehacker.com", "kotaku.com", "polygon.com", "pcgamer.com", "eurogamer.net",
          "rockpapershotgun.com", "gamesradar.com", "destructoid.com", "giantbomb.com", "shacknews.com"
        ];
        storage.defaultListVersion = 1;
        chrome.storage.local.set({ profiles: storage.profiles, defaultListVersion: 1 }, updateUI);
        return;
      }
    }

    document.getElementById('labelElapsed').textContent = trans[L].elapsed;
    document.getElementById('labelVideo').textContent = trans[L].video;
    document.getElementById('labelWatched').textContent = trans[L].watched;

    const plLabel = document.getElementById('labelPlaylist');
    if (plLabel) plLabel.textContent = trans[L].playlist;

    document.getElementById('toListsBtn').textContent = trans[L].listBtn;
    document.getElementById('newProfileName').placeholder = trans[L].pPlaceholder;
    document.getElementById('listInput').placeholder = trans[L].lPlaceholder;
    document.getElementById('listInput').placeholder = trans[L].lPlaceholder;
    document.getElementById('langSelect').value = L;
    document.getElementById('devLink').textContent = trans[L].dev;

    document.getElementById('lblCreateList').textContent = trans[L].createList;
    document.getElementById('lblSelectList').textContent = trans[L].selectList;
    document.getElementById('lblAddSites').textContent = trans[L].addSites;

    const newPType = document.getElementById('newProfileType');
    if (newPType) {
      newPType.options[0].text = trans[L].bName;
      newPType.options[1].text = trans[L].wName;
    }

    document.getElementById('langSelect').onchange = (e) => { chrome.storage.local.set({ lang: e.target.value }, updateUI); };

    const btn = document.getElementById('toggleBtn');
    btn.textContent = res.active ? trans[L].stop : trans[L].start;
    btn.className = `status-btn ${res.active ? 'off' : 'on'}`;

    const pSelect = document.getElementById('profileSelect');
    pSelect.innerHTML = "";
    Object.keys(storage.profiles).forEach(p => {
      let opt = document.createElement('option');
      opt.value = p;
      let typeName = storage.profiles[p].type === 'whitelist' ? trans[L].wName : trans[L].bName;
      opt.textContent = `${p} (${typeName})`;
      opt.selected = (p === storage.currentProfile);
      pSelect.appendChild(opt);
    });

    const currentP = storage.profiles[storage.currentProfile];
    document.getElementById('listItems').innerHTML = (currentP.list || []).map((u, i) => `
      <div class="item"><span>${u}</span><span class="del-item" data-idx="${i}">×</span></div>
    `).join('');

    document.querySelectorAll('.del-item').forEach(el => {
      el.onclick = (e) => {
        storage.profiles[storage.currentProfile].list.splice(e.target.dataset.idx, 1);
        chrome.storage.local.set(storage, updateUI);
      };
    });
  });
}

function addToList() {
  const val = document.getElementById('listInput').value.trim().toLowerCase();
  if (val) {
    storage.profiles[storage.currentProfile].list.push(val);
    chrome.storage.local.set(storage, updateUI);
    document.getElementById('listInput').value = "";
  }
}

document.getElementById('addListBtn').onclick = addToList;
document.getElementById('listInput').onkeypress = (e) => { if (e.key === "Enter") addToList(); };
document.getElementById('toListsBtn').onclick = () => { document.getElementById('focusPage').style.display = 'none'; document.getElementById('listPage').style.display = 'block'; };
document.getElementById('toFocusBtn').onclick = () => { document.getElementById('listPage').style.display = 'none'; document.getElementById('focusPage').style.display = 'block'; };
document.getElementById('toGuideBtn').onclick = () => { chrome.tabs.create({ url: 'guide.html' }); };

document.getElementById('toStatsBtn').onclick = () => {
  chrome.runtime.sendMessage({ type: "persistStats" }, () => {
    chrome.tabs.create({ url: 'statistics.html' });
  });
};

document.getElementById('toggleBtn').onclick = () => {
  if (storage.active) {
    storage.active = false;
    chrome.storage.local.set({ active: false }, updateUI);
    return;
  }

  const videoPatterns = [
    "youtube.com/watch",
    "youtube.com/shorts",
    "youtu.be/"
  ];

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    let isVideo = false;
    if (currentTab && currentTab.url) {
      isVideo = videoPatterns.some(p => currentTab.url.includes(p));
    }

    if (isVideo) {
      storage.active = true;
      chrome.runtime.sendMessage({ type: "startFocus", tabId: currentTab.id });
      chrome.storage.local.set({ active: true }, updateUI);
    } else {
      const L = storage.lang || 'en';
      showAlert(trans[L].warnVideo);
      resetStatsDisplay();
    }
  });
};

function showAlert(msg) {
  const m = document.getElementById('warningModal');
  if (m) {
    document.getElementById('warningText').textContent = msg || "Alert";
    m.style.display = 'flex';
  }
}

let confirmCallback = null;
function showConfirm(msg, onYes) {
  const m = document.getElementById('confirmModal');
  if (m) {
    document.getElementById('confirmText').textContent = msg || "Are you sure?";
    m.style.display = 'flex';
    confirmCallback = onYes;
  }
}

function closeModals() {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  confirmCallback = null;
}

document.querySelectorAll('.close-modal').forEach(el => el.onclick = closeModals);
document.getElementById('closeWarningBtn').onclick = closeModals;
document.getElementById('confirmNoBtn').onclick = closeModals;

document.getElementById('confirmYesBtn').onclick = () => {
  if (confirmCallback) confirmCallback();
  closeModals();
};

document.querySelectorAll('.modal').forEach(m => {
  m.onclick = (e) => { if (e.target === m) closeModals(); };
});

function resetStatsDisplay() {
  document.getElementById('timerDisplay').textContent = "00:00";
  document.getElementById('videoDuration').textContent = "--:--";
  document.getElementById('videoWatched').textContent = "--:--";
  document.getElementById('playlistStats').style.display = 'none';
}
document.getElementById('profileSelect').onchange = (e) => { storage.currentProfile = e.target.value; chrome.storage.local.set({ currentProfile: e.target.value }, updateUI); };

const createProfile = () => {
  const name = document.getElementById('newProfileName').value.trim();
  const type = document.getElementById('newProfileType').value;
  const L = storage.lang || 'en';

  if (name && !storage.profiles[name]) {
    storage.profiles[name] = { list: [], type: type };
    storage.currentProfile = name;
    chrome.storage.local.set(storage, updateUI);
    document.getElementById('newProfileName').value = "";
  } else if (storage.profiles[name]) {
    showAlert(trans[L].warnExist);
  }
};

document.getElementById('addProfileBtn').onclick = createProfile;
document.getElementById('newProfileName').onkeypress = (e) => { if (e.key === "Enter") createProfile(); };

document.getElementById('deleteProfileBtn').onclick = () => {
  const current = storage.currentProfile;
  const L = storage.lang || 'en';

  if (Object.keys(storage.profiles).length <= 1) {
    showAlert(trans[L].warnLast);
    return;
  }

  const defaults = ["Varsayılan", "Default", "Predeterminado", "Varsayılan Liste", "Default List", "Lista Predeterminada"];
  if (defaults.includes(current)) {
    showAlert(trans[L].warnDefault || "Default list cannot be deleted!");
    return;
  }

  showConfirm(trans[L].confirmDel + `"${current}"?`, () => {
    delete storage.profiles[current];
    storage.currentProfile = Object.keys(storage.profiles)[0];
    chrome.storage.local.set(storage, updateUI);
  });
};

function scrapePageData() {
  let plStats = null;

  let containerSelector = "ytd-playlist-video-renderer";
  if (window.location.pathname.startsWith("/watch")) {
    containerSelector = "ytd-playlist-panel-video-renderer";
  }

  const containers = document.querySelectorAll(containerSelector);

  if (containers.length > 0) {
    let totalSec = 0;
    let count = 0;

    const parseTime = (txt) => {
      if (!txt) return 0;
      const t = txt.trim();
      if (!t.includes(':') || isNaN(parseInt(t[0]))) return 0;
      const parts = t.split(':').map(Number);
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
      if (parts.length === 2) return parts[0] * 60 + parts[1];
      return 0;
    };

    containers.forEach(item => {
      const selectors = [
        'span.ytd-thumbnail-overlay-time-status-renderer',
        'div.ytd-thumbnail-overlay-time-status-renderer',
        'div.badge-shape-wiz__text',
        'span#text.ytd-thumbnail-overlay-time-status-renderer'
      ];

      let foundSec = 0;
      for (const sel of selectors) {
        const el = item.querySelector(sel);
        if (el) {
          const sec = parseTime(el.textContent);
          if (sec > 0) { foundSec = sec; break; }
        }
      }

      if (foundSec > 0) {
        totalSec += foundSec;
        count++;
      }
    });

    if (count > 0) {
      plStats = {
        total: totalSec,
        x125: totalSec / 1.25,
        x150: totalSec / 1.5,
        x175: totalSec / 1.75,
        x200: totalSec / 2.0,
        videoCount: count
      };
    }
  }

  const video = document.querySelector('video');
  let duration = "--:--";
  let watched = "--:--";

  if (video && !isNaN(video.duration) && video.duration > 0) {
    const format = (t) => {
      let m = Math.floor(Math.max(0, t) / 60), s = Math.floor(Math.max(0, t) % 60);
      return `${m}:${s < 10 ? '0' + s : s}`;
    };
    const speed = video.playbackRate || 1;
    const remaining = (video.duration - video.currentTime) / speed;
    const progress = Math.floor((video.currentTime / video.duration) * 100);
    const speedLabel = speed !== 1 ? ` (${speed}x)` : "";
    duration = `${format(remaining)} (%${progress})${speedLabel}`;
    watched = format(video.currentTime);
  }

  return { timer: "00:00", duration, watched, playlist: plStats };
}

setInterval(() => {
  if (storage.active) {
    chrome.runtime.sendMessage({ type: "getStats" }, (res) => {
      if (res) updateStatsUI(res);
    });
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const t = tabs[0];
      if (t && t.id && t.url && (t.url.includes("youtube.com"))) {
        chrome.scripting.executeScript({
          target: { tabId: t.id },
          func: scrapePageData
        }, (results) => {
          if (!chrome.runtime.lastError && results && results[0] && results[0].result) {
            updateStatsUI(results[0].result);
          }
        });
      }
    });
  }
}, 500);

function updateStatsUI(res) {
  document.getElementById('timerDisplay').textContent = res.timer;
  document.getElementById('videoDuration').textContent = res.duration;
  document.getElementById('videoWatched').textContent = res.watched;

  const plDiv = document.getElementById('playlistStats');
  if (res.playlist) {
    plDiv.style.display = 'block';

    chrome.storage.local.get(['lang'], (locRes) => {
      const L = locRes.lang || 'en';
      document.getElementById('plTotal').textContent = formatDuration(res.playlist.total, L);
      document.getElementById('pl125').textContent = formatDuration(res.playlist.x125, L);
      document.getElementById('pl150').textContent = formatDuration(res.playlist.x150, L);
      document.getElementById('pl175').textContent = formatDuration(res.playlist.x175, L);
      document.getElementById('pl200').textContent = formatDuration(res.playlist.x200, L);
    });
  } else {
    plDiv.style.display = 'none';
  }
}
updateUI();