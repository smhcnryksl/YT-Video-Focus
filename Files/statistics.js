function formatDuration(seconds, L = 'tr') {
    if (!seconds) return "0s";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const t = trans[L] || trans['tr'];
    const u = t.units || { h: 'h', m: 'm', s: 's' };

    if (h > 0) return `${h}${u.h} ${m}${u.m}`;
    if (m > 0) return `${m}${u.m} ${s}${u.s}`;
    return `${s}${u.s}`;
}

const trans = {
    tr: {
        title: "İstatistikler 📊",
        header: "İstatistikler 📊",
        timeRange: { daily: "Günlük", weekly: "Haftalık", monthly: "Aylık", yearly: "Yıllık", all: "Tüm Zamanlar" },
        cards: { focus: "Odaklanma Süresi", video: "Video İzleme Süresi", blocked: "Engellenen Siteler", count: "Tamamlanan Video", sessions: "Toplam Oturum" },
        charts: { title: "Odaklanma vs Video Süresi", focus: "Odak", video: "Video", avgFocus: "Ort. Odak:", avgVideo: "Ort. Video:" },
        units: { h: 'sa', m: 'dk', s: 'sn' }
    },
    en: {
        title: "Statistics 📊",
        header: "Statistics 📊",
        timeRange: { daily: "Daily", weekly: "Weekly", monthly: "Monthly", yearly: "Yearly", all: "All Time" },
        cards: { focus: "Focus Time", video: "Watch Time", blocked: "Blocked Sites", count: "Videos Completed", sessions: "Total Sessions" },
        charts: { title: "Focus vs Video Time", focus: "Focus", video: "Watch", avgFocus: "Avg. Focus:", avgVideo: "Avg. Watch:" },
        units: { h: 'h', m: 'm', s: 's' }
    },
    es: {
        title: "Estadísticas 📊",
        header: "Estadísticas 📊",
        timeRange: { daily: "Diario", weekly: "Semanal", monthly: "Mensual", yearly: "Anual", all: "Todo el Tiempo" },
        cards: { focus: "Tiempo de Enfoque", video: "Tiempo de Video", blocked: "Sitios Bloqueados", count: "Videos Completados", sessions: "Sesiones Totales" },
        charts: { title: "Enfoque vs Video", focus: "Enfoque", video: "Video", avgFocus: "Prom. Enfoque:", avgVideo: "Prom. Video:" },
        units: { h: 'h', m: 'm', s: 's' }
    }
};

function applyLang(L) {
    const t = trans[L] || trans['en'];
    document.title = t.title;
    document.querySelector('h1').textContent = t.header;

    const sel = document.getElementById('timeRange');
    sel.options[0].text = t.timeRange.daily;
    sel.options[1].text = t.timeRange.weekly;
    sel.options[2].text = t.timeRange.monthly;
    sel.options[3].text = t.timeRange.yearly;
    sel.options[4].text = t.timeRange.all;

    document.querySelector('.focus-card .label').textContent = t.cards.focus;
    document.querySelector('.video-card .label').textContent = t.cards.video;
    document.querySelector('.blocked-card .label').textContent = t.cards.blocked;
    document.querySelector('.count-card .label').textContent = t.cards.count;
    document.querySelector('.session-card .label').textContent = t.cards.sessions;

    document.querySelector('.chart-box h3').textContent = t.charts.title;
    document.querySelector('.focus-bar + .legend').textContent = t.charts.focus;
    document.querySelector('.video-bar + .legend').textContent = t.charts.video;
}

function aggregateStats(allStats, range) {
    const today = new Date();
    let totalFocus = 0;
    let totalVideo = 0;
    let totalBlocked = 0;
    let totalVideoCount = 0;
    let totalFocusSessions = 0;

    const days = allStats.days || {};

    Object.keys(days).forEach(dateStr => {
        const d = new Date(dateStr);
        const dayStats = days[dateStr];
        let include = false;

        if (range === 'daily') {
            const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            if (dateStr === todayKey) include = true;
        } else if (range === 'weekly') {
            const diffTime = Math.abs(today - d);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays <= 7) include = true;
        } else if (range === 'monthly') {
            if (d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) include = true;
        } else if (range === 'yearly') {
            if (d.getFullYear() === today.getFullYear()) include = true;
        } else if (range === 'all') {
            include = true;
        }

        if (include) {
            totalFocus += (dayStats.focusTime || 0);
            totalVideo += (dayStats.videoTime || 0);
            totalBlocked += (dayStats.blockedCount || 0);
            totalVideoCount += (dayStats.videoCount || 0);
            totalFocusSessions += (dayStats.focusSessions || 0);
        }
    });

    return { totalFocus, totalVideo, totalBlocked, totalVideoCount, totalFocusSessions };
}

function updateUI(stats) {
    chrome.storage.local.get(['lang'], (res) => {
        const L = res.lang || 'tr';
        const t = trans[L] || trans['tr'];

        document.getElementById('totalFocusTime').textContent = formatDuration(stats.totalFocus, L);
        document.getElementById('videoWatchTime').textContent = formatDuration(stats.totalVideo, L);
        document.getElementById('blockedCount').textContent = stats.totalBlocked;
        document.getElementById('videoCount').textContent = stats.totalVideoCount;
        document.getElementById('totalSessions').textContent = stats.totalFocusSessions;

        const maxVal = Math.max(stats.totalFocus, stats.totalVideo, 1);
        const focusPerc = (stats.totalFocus / maxVal) * 100;
        const videoPerc = (stats.totalVideo / maxVal) * 100;

        const fBar = document.getElementById('chartFocusBar');
        const vBar = document.getElementById('chartVideoBar');

        fBar.style.height = `${Math.max(focusPerc, 2)}%`;
        vBar.style.height = `${Math.max(videoPerc, 2)}%`;

        fBar.innerHTML = `<span class="chart-bar-value">${formatDuration(stats.totalFocus, L)}</span>`;
        vBar.innerHTML = `<span class="chart-bar-value">${formatDuration(stats.totalVideo, L)}</span>`;

        const avgFocus = stats.totalFocusSessions > 0 ? Math.floor(stats.totalFocus / stats.totalFocusSessions) : 0;
        const avgVideo = stats.totalFocusSessions > 0 ? Math.floor(stats.totalVideo / stats.totalFocusSessions) : 0;

        document.getElementById('avgFocus').innerHTML = `${t.charts.avgFocus} <span>${formatDuration(avgFocus, L)}</span>`;
        document.getElementById('avgVideo').innerHTML = `${t.charts.avgVideo} <span>${formatDuration(avgVideo, L)}</span>`;
    });
}

function loadStats() {
    chrome.storage.local.get(['stats', 'lang', 'active', 'focusStartTime'], (res) => {
        applyLang(res.lang || 'en');
        const range = document.getElementById('timeRange').value;
        const rawStats = res.stats || { days: {} };
        const agg = aggregateStats(rawStats, range);

        if (res.active && res.focusStartTime) {
            const now = Date.now();
            const elapsedCur = Math.floor((now - res.focusStartTime) / 1000);
            agg.totalFocus += elapsedCur;
        }

        updateUI(agg);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    document.getElementById('timeRange').addEventListener('change', loadStats);
    document.getElementById('closeBtn').addEventListener('click', () => {
        window.close();
    });
});
