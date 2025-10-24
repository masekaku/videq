document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    let videos =;

    // Fungsi slugify tidak lagi dibutuhkan untuk routing, tapi bisa disimpan untuk keperluan lain.
    const slugify = (text) => {
        return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    };

    const updateMetaTags = (video) => {
        // URL sekarang menggunakan ID unik, lebih andal.
        const pageUrl = `${window.location.origin}/v/${video.id}`;
        const thumbnailUrl = `https://www.domainsitusanda.com/path/to/default-thumbnail.jpg`;

        document.title = `${video.title} | Nama Situs Anda`;
        document.querySelector('meta[name="description"]').setAttribute('content', `Tonton video: ${video.title}`);
        
        document.querySelector('meta[property="og:title"]').setAttribute('content', video.title);
        document.querySelector('meta[property="og:type"]').setAttribute('content', 'video.other');
        document.querySelector('meta[property="og:description"]').setAttribute('content', `Tonton video: ${video.title}`);
        document.querySelector('meta[property="og:url"]').setAttribute('content', pageUrl);
        document.querySelector('meta[property="og:image"]').setAttribute('content', thumbnailUrl);
        document.querySelector('meta[property="og:video"]').setAttribute('content', video.url);

        document.querySelector('meta[name="twitter:card"]').setAttribute('content', 'player');
        document.querySelector('meta[name="twitter:title"]').setAttribute('content', video.title);
        document.querySelector('meta[name="twitter:description"]').setAttribute('content', `Tonton video: ${video.title}`);
        document.querySelector('meta[name="twitter:image"]').setAttribute('content', thumbnailUrl);
        document.querySelector('meta[name="twitter:player"]').setAttribute('content', video.url);
        document.querySelector('meta[name="twitter:player:width"]').setAttribute('content', '1280');
        document.querySelector('meta[name="twitter:player:height"]').setAttribute('content', '720');
        
        const schema = {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": video.title,
            "description": `Deskripsi lengkap untuk video ${video.title}.`,
            "thumbnailUrl": thumbnailUrl,
            "uploadDate": new Date().toISOString(),
            "duration": "PT5M30S",
            "embedUrl": video.url,
            "interactionStatistic": {
                "@type": "InteractionCounter",
                "interactionType": { "@type": "WatchAction" },
                "userInteractionCount": Math.floor(Math.random() * 1000) + 30
            }
        };
        document.getElementById('schema-video-object').textContent = JSON.stringify(schema, null, 2);
    };

    const renderVideoPage = (video) => {
        updateMetaTags(video);
        app.innerHTML = `
            <div class="w-full max-w-2xl p-2.5 box-border flex flex-col flex-grow">
                <header class="flex justify-between items-center p-4 border border-gray-700 rounded-lg bg-gray-800 mb-4">
                    <div class="flex items-center gap-2">
                        <div class="flex gap-1">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <a href="/" class="font-bold text-lg no-underline text-white">ohbro.co</a>
                    </div>
                    <div class="w-6 h-6 border-2 border-white rounded-full"></div>
                </header>
                <main>
                    <section class="relative w-full aspect-video bg-black rounded-lg mb-4 overflow-hidden">
                        <iframe src="${video.url}" class="absolute top-0 left-0 w-full h-full border-0" frameborder="0" allowfullscreen></iframe>
                    </section>
                    <section class="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4 text-center text-sm text-gray-400">
                        <p>iklan mungkin menyebalkan, tetapi itu satu-satunya cara kami untuk menjaga server. Kesabaran Anda sangat kami hargai dan kami harap layanan kami sepadan dengan usaha Anda.</p>
                    </section>
                    <section class="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
                        <h2 class="mt-0 text-lg border-b border-gray-700 pb-2.5 mb-4 font-bold">Explore</h2>
                        <nav class="flex flex-wrap gap-2.5">
                            <a href="#" class="inline-flex items-center gap-2 bg-accent text-black rounded-full px-4 py-2 text-sm font-medium cursor-pointer no-underline">JEPANG</a>
                            <a href="#" class="inline-flex items-center gap-2 bg-accent text-black rounded-full px-4 py-2 text-sm font-medium cursor-pointer no-underline">MODEL</a>
                            <a href="#" class="inline-flex items-center gap-2 bg-accent text-black rounded-full px-4 py-2 text-sm font-medium cursor-pointer no-underline">VIRAL</a>
                        </nav>
                    </section>
                    <section class="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
                        <h2 class="mt-0 text-lg mb-2.5 font-bold">Viewing File</h2>
                        <p class="text-sm text-gray-400 mb-5 break-all">Filename: ${video.title}</p>
                        <div class="flex flex-col gap-2.5">
                            <a href="#" class="w-full p-4 rounded-lg border border-gray-700 bg-transparent text-white text-base font-medium cursor-pointer text-center no-underline">34 views</a>
                            <a href="#" class="w-full p-4 rounded-lg border border-white bg-transparent text-white text-base font-medium cursor-pointer text-center no-underline">Secure Download</a>
                        </div>
                    </section>
                </main>
                <footer class="w-full bg-gray-200 text-gray-800 p-2.5 box-border flex items-center gap-2.5 rounded-lg mt-auto">
                    <div class="w-10 h-10 bg-[#00a599] text-white flex items-center justify-center font-bold rounded-lg text-lg">G</div>
                    <div class="flex-grow">
                        <strong class="block text-sm">Grab</strong>
                        <span class="text-xs text-gray-600">Banyak belanjaan gak bakal drama...</span>
                    </div>
                    <button class="bg-[#00a599] text-white border-none px-4 py-2 rounded-md font-bold cursor-pointer">INSTALL</button>
                </footer>
            </div>
        `;
    };

    const renderHomePage = () => {
        document.title = 'Nama Situs Anda';
        app.innerHTML = `
            <div class="w-full max-w-2xl p-2.5 box-border">
                <header class="flex justify-between items-center p-4 border border-gray-700 rounded-lg bg-gray-800 mb-4">
                     <div class="flex items-center gap-2">
                        <div class="flex gap-1">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div><div class="w-3 h-3 rounded-full bg-yellow-500"></div><div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span class="font-bold text-lg">ohbro.co</span>
                    </div>
                    <div class="w-6 h-6 border-2 border-white rounded-full"></div>
                </header>
                <main>
                    <section class="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <h2 class="mt-0 text-lg font-bold mb-4">Daftar Video</h2>
                        <ul class="list-none p-0">
                            ${videos.map(video => `
                                <li class="mb-2.5">
                                    <a href="/v/${video.id}" class="text-accent no-underline text-lg hover:underline">${video.title}</a>
                                </li>
                            `).join('')}
                        </ul>
                    </section>
                </main>
            </div>
        `;
    };

    const router = async () => {
        try {
            if (videos.length === 0) {
                const response = await fetch('/videos.json');
                if (!response.ok) throw new Error('Network response was not ok');
                videos = await response.json();
            }

            const path = window.location.pathname;
            const parts = path.split('/').filter(p => p);

            if (parts.length === 2 && parts === 'v') {
                const id = parts[span_0](start_span)[span_0](end_span);
                // PERUBAHAN UTAMA: Mencari video berdasarkan 'id', bukan slug dari 'title'
                const video = videos.find(v => v.id === id);
                if (video) {
                    renderVideoPage(video);
                } else {
                    app.innerHTML = '<h1 class="text-2xl font-bold text-center mt-10">404 - Video Tidak Ditemukan</h1>';
                }
            } else {
                renderHomePage();
            }
        } catch (error) {
            console.error('Gagal memuat data video:', error);
            app.innerHTML = '<h1 class="text-2xl font-bold text-center mt-10">Gagal memuat konten. Silakan coba lagi nanti.</h1>';
        }
    };

    document.body.addEventListener('click', e => {
        const anchor = e.target.closest('a');
        if (anchor && anchor.href && anchor.getAttribute('href').startsWith('/')) {
            e.preventDefault();
            history.pushState(null, '', anchor.href);
            router();
        }
    });

    window.addEventListener('popstate', router);
    router();
});