export function playClickSound() {
    const audio = new Audio("/audioFiles/click.mp3");

    audio.currentTime = 0;

    audio.play().catch(err => {
        console.error("ERROR PLAYING THE CLICK SOUND\n", err);
    });
}
export function playDeathSound() {
    const audio = new Audio("./audioFiles/deathSound.mp3");

    audio.currentTime = 0;

    audio.play().catch(err => {
        console.error("ERROR PLAYING THE DEATH SOUND\n", err);
    });
}
let bgMusic = null;

export function playBackgroundMusic() {
    if (bgMusic) return; // Prevent duplicate instances

    bgMusic = new Audio("./audioFiles/bgmusic.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.5;
    bgMusic.play().catch(err => {
        console.error("Background music failed to play:", err.message);
        bgMusic = null;
    });
}
export function stopBackgroundMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic = null;
}