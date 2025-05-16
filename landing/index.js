function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function positionElement(element, x, y) {
    element.style.position = "absolute";
    element.style.left = x + "%";
    element.style.top = y + "%";
}

function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

const emojis = [
    '🌱', '🌿', '🍃',
    '🐊', '🐢', '🐛', '🐸', '🪴',
];

function createEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('fallingEmoji');
    emoji.textContent = getRandomEmoji();
    const distance = getRandomBetween(0, 1);
    const minSpeed = 0.05;
    const maxSpeed = 0.3;
    const speedMultiplier = 1 - (distance * 0.9);
    const speed = getRandomBetween(minSpeed, maxSpeed) * speedMultiplier;

    emoji.emojiData = {
        distance: distance,
        scale: getRandomBetween(0.8, 1.0) * (2.0 - distance),
        speed: speed,
        rotationSpeed: getRandomBetween(0.1, 0.5),
        rotationDirection: Math.random() > 0.5 ? 1 : -1,
        rotation: 0
    };

    return emoji;
}

function updateEmojiStyle(emoji) {
    const data = emoji.emojiData;
    const opacity = 1.0 - (data.distance * 0.2);
    const zIndex = 10 - Math.floor(data.distance * 10);

    // Apply the other styles
    emoji.style.transform = `translate(-50%, -50%) scale(${data.scale}) rotate(${data.rotation}deg)`;
    emoji.style.zIndex = zIndex;

    emoji.style.opacity = opacity;
    console.log(opacity);
}

function setupEmoji(x, y) {
    const emoji = createEmoji();
    positionElement(emoji, x, y);
    updateEmojiStyle(emoji);
    document.body.appendChild(emoji);
    return emoji;
}

function updateEmoji(emoji) {
    const data = emoji.emojiData;
    let newTop = parseFloat(emoji.style.top) + data.speed;
    if (newTop > 110) {
        newTop = -10;
    }
    emoji.style.top = newTop + "%";
    data.rotation = (data.rotation + data.rotationSpeed * data.rotationDirection) % 360;
    updateEmojiStyle(emoji);
}

function addEmojis(count) {
    const columns = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / columns);
    const cellWidth = 100 / columns;
    const cellHeight = 100 / rows;

    let emojiCount = 0;
    for (let row = 0; row < rows && emojiCount < count; row++) {
        for (let col = 0; col < columns && emojiCount < count; col++) {
            const x = cellWidth * col + (cellWidth / 2) + getRandomBetween(-cellWidth * 0.2, cellWidth * 0.2);
            const y = cellHeight * row + (cellHeight / 2) + getRandomBetween(-cellHeight * 0.2, cellHeight * 0.2);
            setupEmoji(x, y);
            emojiCount++;
        }
    }
}

function handleClick(event) {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    setupEmoji(x, y);
}

function animateEmojis() {
    document.querySelectorAll('.fallingEmoji').forEach(updateEmoji);
    requestAnimationFrame(animateEmojis);
}

function initialize() {
    addEmojis(40);
    animateEmojis();
    document.addEventListener('click', handleClick);
}

initialize();