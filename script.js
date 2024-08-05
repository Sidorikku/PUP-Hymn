const audio = document.getElementById('audio-player');
const lyrics = document.getElementById('lyrics');
const lyricsContainer = document.getElementById('lyrics-container');

// Define timestamps and corresponding lyrics
const lyricTimestamps = [0,13,15,18.5,24.5,30,35.5,41.5,47.5,53.5,56,62.5,69,73.5,80.5,85.5,89,95.5,104]; 
const lyricsLines = 
        ["~ [Intro] Instrumental  ~",
        "Sintang Paaralan ",
        "Tanglaw ka ng bayan",
        "Pandayan ng isip ng kabataan",
        "Kami ay dumating na salat sa yaman",
        "Hanap na dunong ay iyong alay",
        "Ang layunin mong makatao",
        "Dinarangal ng Pilipino",
        "Ang iyong aral, diwa, adhikang taglay",
        "PUP, aming gabay",
        "Paaralang dakila  ",
        "PUP, pinagpala",
        "Gagamitin ang karunungan",
        "Mula sa iyo, para sa bayan",
        "Ang iyong aral, diwa, adhikang taglay",
        "PUP, aming gabay",
        "Paaralang dakila",
        "PUP, pinagpala",
        "- End -"];

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;

    // Find the current lyric line
    let currentLyricIndex = 0;
    for (let i = 0; i < lyricTimestamps.length; i++) {
        if (currentTime >= lyricTimestamps[i]) {
            currentLyricIndex = i;
        } else {
            break;
        }
    }

    // Display the current lyric line
    lyrics.textContent = lyricsLines[currentLyricIndex];

    // Display previous lyric lines if available
    let previousLines = "";
    for (let i = Math.max(0, currentLyricIndex - 2); i < currentLyricIndex; i++) {
        previousLines += `<span class="previous-line">${lyricsLines[i]}</span><br>`;
    }

    // Display next lyric lines if available
    let nextLines = "";
    for (let i = currentLyricIndex + 1; i <= Math.min(currentLyricIndex + 2, lyricsLines.length - 1); i++) {
        nextLines += `<br><span class="next-line">${lyricsLines[i]}</span>`;
    }

    // Combine current, previous, and next lines
    lyrics.innerHTML = `${previousLines}${lyrics.textContent}${nextLines}`;

    // Scroll lyrics container to show the current line
    const lineHeight = 20; 
    const offset = Math.max(0, (currentLyricIndex - 2) * lineHeight);
    lyricsContainer.scrollTo({ top: offset, behavior: 'smooth' });
});