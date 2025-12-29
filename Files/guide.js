const trans = {
    tr: {
        title: "Kullanım Kılavuzu 📘",
        header: "Kullanım Kılavuzu 📘",
        intro: "YT Video Focus, YouTube'da dikkatinizi korumanıza ve verimli çalışmanıza yardımcı olan gelişmiş bir odaklanma asistanıdır.",
        sections: [
            {
                title: "1. Ana Ekran ve Özellikler",
                content: `
                    <ul>
                        <li><b>Zamanlayıcılar:</b> "Toplam Çalışma" ve "Kalan Video Süresi"ni takip eder.</li>
                        <li><b>Oynatma Listesi Süresi:</b> Oynatma listesi sayfalarında, toplam süreyi ve farklı hızlardaki (1.25x, 1.5x vb.) bitirme sürelerini gösterir.</li>
                        <li><b>Başlat/Durdur:</b> Odak modunu açar. YouTube arayüzü sadeleşir, yorumlar ve öneriler gizlenir.</li>
                        <li><b>İstatistikler (📊):</b> Detaylı kullanım raporlarını gösterir.</li>
                    </ul>
                `
            },
            {
                title: "2. Çalışma Profilleri (Listeler)",
                content: `
                    <p>"Listeleri Yönet" menüsünden farklı senaryolar (Ders, İş vb.) için profiller oluşturabilirsiniz.</p>
                    <ul>
                        <li><b>Engelleme Modu (Kara Liste):</b> Sadece eklediğiniz siteleri engeller (Örn: Sadece sosyal medya yasak).</li>
                        <li><b>Sıkı Mod (Beyaz Liste):</b> YouTube hariç <u>tüm interneti engeller</u>, sadece izin verdiklerinizi açar.</li>
                    </ul>
                    <div class="note">
                        🛡️ <b>Varsayılan Liste:</b> Sizin için önceden hazırladığımız dikkati dağıtan siteler listesidir (Instagram, TikTok, Twitter vb.). Bu liste silinemez ama içeriğini düzenleyebilirsiniz.
                    </div>
                `
            },
            {
                title: "3. Nasıl Kullanılır? (Adım Adım)",
                content: `
                    <div class="step-guide">
                        <h4>Adım 1: Liste ve Mod Seçimi</h4>
                        <p>Eklentiyi açın ve <b>"Listeleri Yönet"</b> butonuna tıklayın. Buradan amacınıza uygun bir liste seçin:</p>
                        <ul>
                            <li><b>Kara Liste (Önerilen):</b> "Varsayılan" listeyi seçerseniz popüler dikkat dağıtıcılar zaten engellidir. Ekstra site ekleyebilirsiniz.</li>
                            <li><b>Beyaz Liste:</b> Sadece ders/iş için kesin gerekli siteleri ekleyin. YouTube dışında her yer kapanır.</li>
                        </ul>

                        <h4>Adım 2: Odaklanmayı Başlatma</h4>
                        <p>Ayarlarınız bittikten sonra ana ekrana dönün:</p>
                        <ul>
                            <li>YouTube'da çalışmak veya izlemek istediğiniz <b>videoyu açın</b> (Video açık olmadan odak modu başlamaz!).</li>
                            <li>Eklentideki <b>BAŞLAT</b> butonuna basın.</li>
                        </ul>
                        <div class="note">
                            🚀 <b>Odak Modunda Neler Olur?</b><br>
                            - YouTube yorumları, yan panel ve Shorts gizlenir.<br>
                            - Seçtiğiniz listedeki yasaklı sitelere girmeniz engellenir.<br>
                            - Süre sayacı işlemeye başlar.
                        </div>

                        <h4>Adım 3: Çalışma ve Bitiş</h4>
                        <p>Odaklanma şu durumlarda biter:</p>
                        <ul>
                            <li>İzlediğiniz <b>video bittiğinde</b>.</li>
                            <li>Video sekmesini <b>kapattığınızda</b>.</li>
                            <li>Siz <b>DURDUR</b> butonuna bastığınızda.</li>
                        </ul>
                    </div>
                `
            },
            {
                title: "4. İpuçları",
                content: `
                    <div class="note">
                        💡 <b>Video Süresi:</b> Video izlerken duraklatırsanız, "Kalan Video Süresi" sayacı da durur. Net çalışma sürenizi ölçersiniz.
                    </div>
                    <div class="note">
                        ⚡ <b>Sıkı Koruma:</b> "Varsayılan" liste silinmeye karşı korumalıdır. Kendinizi disipline etmek için bu listeyi kullanın.
                    </div>
                `
            }
        ]
    },
    en: {
        title: "User Guide 📘",
        header: "User Guide 📘",
        intro: "YT Video Focus is an advanced focus assistant designed to help you stay productive and distraction-free on YouTube.",
        sections: [
            {
                title: "1. Main Screen & Features",
                content: `
                    <ul>
                        <li><b>Timers:</b> Tracks "Total Focus Time" and "Remaining Video Time".</li>
                        <li><b>Playlist Duration:</b> Shows total duration and completion times at different speeds (1.25x, 1.5x, etc.) on playlist pages.</li>
                        <li><b>Start/Stop:</b> Toggles focus mode. Hides YouTube comments, recommendations, and shorts.</li>
                        <li><b>Statistics (📊):</b> Shows detailed usage reports.</li>
                    </ul>
                `
            },
            {
                title: "2. Work Profiles (Lists)",
                content: `
                    <p>Create profiles for different scenarios (Study, Work) via "Manage Lists".</p>
                    <ul>
                        <li><b>Blacklist Mode:</b> Blocks only the sites you add (e.g., social media).</li>
                        <li><b>Whitelist Mode (Strict):</b> Blocks <u>the entire internet</u> except YouTube and allowed sites.</li>
                    </ul>
                    <div class="note">
                        🛡️ <b>Default List:</b> A pre-made list of common distractions (Instagram, TikTok, Twitter, etc.). This list cannot be deleted, but you can edit its content.
                    </div>
                `
            },
            {
                title: "3. How to Use? (Step-by-Step)",
                content: `
                    <div class="step-guide">
                        <h4>Step 1: Select List & Mode</h4>
                        <p>Open <b>"Manage Lists"</b>. Choose a profile that suits your goal:</p>
                        <ul>
                            <li><b>Blacklist (Recommended):</b> The "Default" list already blocks popular distractions. You can add more.</li>
                            <li><b>Whitelist:</b> Add only websites essential for your work. Everything else will be blocked.</li>
                        </ul>

                        <h4>Step 2: Start Focusing</h4>
                        <p>Return to the main screen:</p>
                        <ul>
                            <li>Open the <b>YouTube video</b> you want to watch (Focus mode requires an active video!).</li>
                            <li>Click the <b>START</b> button.</li>
                        </ul>
                        <div class="note">
                            🚀 <b>What Happens in Focus Mode?</b><br>
                            - YouTube comments, sidebar suggestions, and Shorts are hidden.<br>
                            - Access to blocked sites in your list is prevented.<br>
                            - Timers start tracking your session.
                        </div>

                        <h4>Step 3: During & Ending</h4>
                        <p>The session ends automatically if:</p>
                        <ul>
                            <li>The <b>video ends</b>.</li>
                            <li>You <b>close the tab</b>.</li>
                            <li>You manually click <b>STOP</b>.</li>
                        </ul>
                    </div>
                `
            },
            {
                title: "4. Tips",
                content: `
                    <div class="note">
                        💡 <b>Timer Accuracy:</b> If you pause the video, the "Video Time" counter also pauses, ensuring accurate tracking.
                    </div>
                    <div class="note">
                        ⚡ <b>Protection:</b> The "Default" list is protected from deletion to help you maintain discipline.
                    </div>
                `
            }
        ]
    },
    es: {
        title: "Guía de Usuario 📘",
        header: "Guía de Usuario 📘",
        intro: "YT Video Focus es un asistente avanzado diseñado para ayudarte a mantener la concentración y productividad en YouTube.",
        sections: [
            {
                title: "1. Pantalla Principal y Funciones",
                content: `
                    <ul>
                        <li><b>Temporizadores:</b> Rastrea "Tiempo Total" y "Tiempo Restante".</li>
                        <li><b>Duración de Lista:</b> Muestra la duración total y tiempos a diferentes velocidades en listas de reproducción.</li>
                        <li><b>Iniciar/Detener:</b> Activa el modo de enfoque. Oculta comentarios y recomendaciones.</li>
                        <li><b>Estadísticas (📊):</b> Muestra informes detallados.</li>
                    </ul>
                `
            },
            {
                title: "2. Perfiles de Trabajo (Listas)",
                content: `
                    <p>Crea perfiles para diferentes escenarios en "Gestionar Listas".</p>
                    <ul>
                        <li><b>Modo Lista Negra:</b> Bloquea solo los sitios que agregues.</li>
                        <li><b>Modo Lista Blanca (Estricto):</b> Bloquea <u>todo internet</u> excepto YouTube y sitios permitidos.</li>
                    </ul>
                    <div class="note">
                        🛡️ <b>Lista Predeterminada:</b> Una lista prefabricada de distracciones comunes (Instagram, TikTok, etc.). No se puede eliminar.
                    </div>
                `
            },
            {
                title: "3. ¿Cómo Usar? (Paso a Paso)",
                content: `
                    <div class="step-guide">
                        <h4>Paso 1: Seleccionar Lista y Modo</h4>
                        <p>Abre <b>"Gestionar Listas"</b>. Elige un perfil:</p>
                        <ul>
                            <li><b>Lista Negra (Recomendado):</b> La lista "Predeterminada" ya bloquea distracciones populares.</li>
                            <li><b>Lista Blanca:</b> Agrega solo sitios esenciales. Todo lo demás será bloqueado.</li>
                        </ul>

                        <h4>Paso 2: Iniciar Enfoque</h4>
                        <p>Vuelve a la pantalla principal:</p>
                        <ul>
                            <li>Abre el <b>video de YouTube</b> (¡Se requiere un video activo!).</li>
                            <li>Haz clic en el botón <b>INICIAR</b>.</li>
                        </ul>
                        <div class="note">
                            🚀 <b>¿Qué Pasa en Modo Enfoque?</b><br>
                            - Se ocultan comentarios, sugerencias y Shorts.<br>
                            - Se impide el acceso a sitios bloqueados.<br>
                            - Los temporizadores comienzan a contar.
                        </div>

                        <h4>Paso 3: Finalización</h4>
                        <p>La sesión termina automáticamente si:</p>
                        <ul>
                            <li>El <b>video termina</b>.</li>
                            <li><b>Cierras la pestaña</b>.</li>
                            <li>Haces clic en <b>DETENER</b>.</li>
                        </ul>
                    </div>
                `
            },
            {
                title: "4. Consejos",
                content: `
                    <div class="note">
                        💡 <b>Precisión:</b> Si pausas el video, el contador de tiempo también se pausa.
                    </div>
                    <div class="note">
                        ⚡ <b>Protección:</b> La lista "Predeterminada" está protegida contra eliminación para ayudarte a mantener la disciplina.
                    </div>
                `
            }
        ]
    }
};

function loadGuide() {
    chrome.storage.local.get(['lang'], (res) => {
        const L = res.lang || 'en';
        const t = trans[L] || trans['en'];

        document.title = t.title;
        document.querySelector('h1').textContent = t.header;
        document.getElementById('intro').textContent = t.intro;

        const container = document.getElementById('contentArea');
        container.innerHTML = t.sections.map(s => `
            <div class="section">
                <h2>${s.title}</h2>
                <div>${s.content}</div>
            </div>
        `).join('');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadGuide();
});
