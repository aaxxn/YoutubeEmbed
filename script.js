function convertYouTubeUrl(url) {
    const patterns = {
        shortLink: /youtu\.be\/([a-zA-Z0-9_-]+)(\?si=[a-zA-Z0-9_-]+)?/,
        watchLink: /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(\?si=[a-zA-Z0-9_-]+)?/,
        embedLink: /youtube\.com\/embed\/([a-zA-Z0-9_-]+)(\?si=[a-zA-Z0-9_-]+)?/
    };

    let videoId = null;
    let siParam = null;

    for (let pattern in patterns) {
        const match = url.match(patterns[pattern]);
        if (match) {
            videoId = match[1];
            siParam = match[2] || '';
            break;
        }
    }

    if (videoId) {
        return `${videoId}${siParam}`;
    } else {
        return null;
    }
}

function copyToClipboard() {
    const embedUrl = document.getElementById('embedUrl').innerText;
    navigator.clipboard.writeText(embedUrl).then(() => {
        alert('URL berhasil disalin!');
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
    });
}

document.getElementById('convertBtn').addEventListener('click', function() {
    const url = document.getElementById('urlInput').value;
    const resultContainer = document.getElementById('result');
    const embedUrlDiv = document.getElementById('embedUrl');
    
    if (url.trim() === '') {
        alert('Mohon masukkan URL YouTube');
        return;
    }

    const embedUrl = convertYouTubeUrl(url);
    
    if (embedUrl) {
        resultContainer.style.display = 'block';
        embedUrlDiv.innerText = embedUrl;
    } else {
        alert('URL YouTube tidak valid');
    }
});