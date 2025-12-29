let lastVideoUrl = "https://www.youtube.com";
let lastVideoTabId = null;
let startTime = null;
let videoProgress = "--:--";
let videoWatched = "--:--";
let videoPlaylist = null;

let isFocusActive = false;

let cachedStats = null;
let saveTimer = null;

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function ensureStatsLoaded(cb) {
  if (cachedStats) {
    cb();
  } else {
    chrome.storage.local.get(['stats'], (res) => {
      cachedStats = res.stats || { days: {} };
      cb();
    });
  }
}

function persistStats() {
  if (cachedStats) {
    chrome.storage.local.set({ stats: cachedStats });
  }
}

function triggerSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    persistStats();
    saveTimer = null;
  }, 2000);
}

function updateStat(key, value, isIncrement = true) {
  ensureStatsLoaded(() => {
    const today = getTodayKey();
    if (!cachedStats.days[today]) {
      cachedStats.days[today] = { focusTime: 0, videoTime: 0, blockedCount: 0, videoCount: 0, focusSessions: 0 };
    }

    if (isIncrement) {
      cachedStats.days[today][key] = (cachedStats.days[today][key] || 0) + value;
    } else {
      cachedStats.days[today][key] = value;
    }

    triggerSave();
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['profiles', 'stats'], (res) => {
    if (!res.profiles) {
      chrome.storage.local.set({
        profiles: {
          "Varsayılan": {
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
          }
        },
        currentProfile: "Varsayılan", active: false, lang: "en"
      });
    }
    if (!res.stats) {
      const initStats = { days: {} };
      chrome.storage.local.set({ stats: initStats });
      cachedStats = initStats;
    }
  });
});

ensureStatsLoaded(() => { });

chrome.runtime.onSuspend.addListener(() => {
  persistStats();
});

function processBlocking(tabId, url) {
  if (!url || url.includes(chrome.runtime.id)) return;
  chrome.storage.local.get(['active', 'profiles', 'currentProfile'], (res) => {
    if (res.active && res.profiles?.[res.currentProfile]) {
      const p = res.profiles[res.currentProfile];
      const normalizedUrl = url.toLowerCase();
      let shouldBlock = false;

      if (p.type === "whitelist") {
        const isAllowed = p.list.some(site => normalizedUrl.includes(site.toLowerCase())) || normalizedUrl.includes("youtube.com");
        if (!isAllowed) shouldBlock = true;
      } else {
        const isBlocked = p.list.some(site => normalizedUrl.includes(site.toLowerCase()));
        if (isBlocked) shouldBlock = true;
      }

      if (shouldBlock) {
        updateStat('blockedCount', 1);
        chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
      }
    }
  });
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0) processBlocking(details.tabId, details.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (isFocusActive) return;

  if (tab.url && tab.url.includes("youtube.com/watch")) {
    lastVideoTabId = tabId;
    lastVideoUrl = tab.url;
  }

  if (changeInfo.url) processBlocking(tabId, changeInfo.url);
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === lastVideoTabId) {
    chrome.storage.local.get(['active'], (res) => {
      if (res.active) {
        chrome.storage.local.set({ active: false });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "getStats") {
    chrome.storage.local.get(['active'], (res) => {
      if (!res.active) {
        sendResponse({ timer: "00:00", duration: "--:--", watched: "--:--", playlist: null });
        return;
      }

      ensureStatsLoaded(() => {
        let elapsed = "00:00";
        if (startTime) {
          let diff = Math.floor((Date.now() - startTime) / 1000);
          let m = Math.floor(diff / 60), s = diff % 60;
          elapsed = `${m}:${s < 10 ? '0' + s : s}`;
        }
        sendResponse({ timer: elapsed, duration: videoProgress, watched: videoWatched, playlist: videoPlaylist });
      });
    });
    return true;
  }

  if (['setDuration', 'videoCompleted', 'videoWatchedChunk'].includes(msg.type)) {
    if (!isFocusActive || (sender.tab && sender.tab.id !== lastVideoTabId)) {
      return;
    }
  }

  if (msg.type === "setDuration") {
    videoProgress = msg.duration;
    videoWatched = msg.watched;
    videoPlaylist = msg.playlist;
  }
  if (msg.type === "videoCompleted") {
    updateStat('videoCount', 1);
  }
  if (msg.type === "videoWatchedChunk") {
    updateStat('videoTime', msg.seconds);
  }
  if (msg.type === "goBackToVideo") {
    if (lastVideoTabId) {
      chrome.tabs.update(lastVideoTabId, { active: true });
      if (sender.tab) chrome.tabs.remove(sender.tab.id);
    } else {
      chrome.tabs.update(sender.tab.id, { url: lastVideoUrl });
    }
  }
  if (msg.type === "startFocus") {
    lastVideoTabId = msg.tabId;
    return;
  }
  if (msg.type === "persistStats") {
    ensureStatsLoaded(() => {
      persistStats();
      sendResponse({ success: true });
    });
    return true;
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.active) {
    const isActive = changes.active.newValue;
    isFocusActive = isActive;

    if (isActive) {
      startTime = Date.now();
      chrome.storage.local.set({ focusStartTime: startTime });
      updateStat('focusSessions', 1);
    } else {
      chrome.storage.local.remove(['focusStartTime']);
      if (startTime) {
        const durationSec = Math.floor((Date.now() - startTime) / 1000);
        updateStat('focusTime', durationSec);
        startTime = null;
      }
      videoProgress = "--:--";
      videoWatched = "--:--";
      videoPlaylist = null;
      lastVideoUrl = "https://www.youtube.com";
      lastVideoTabId = null;
    }
  }

  if (changes.focusStartTime) {
    if (changes.focusStartTime.newValue) startTime = changes.focusStartTime.newValue;
  }
});

chrome.storage.local.get(['active', 'focusStartTime'], (res) => {
  isFocusActive = !!res.active;
  if (res.active && res.focusStartTime) {
    startTime = res.focusStartTime;
  } else {
    videoProgress = "--:--";
    videoWatched = "--:--";
    videoPlaylist = null;
  }
});