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

    emoji.emojiData = {
        scale: getRandomBetween(0.8, 1.5),
        speed: getRandomBetween(0.05, 0.3),
        rotationSpeed: getRandomBetween(0.5, 3),
        rotationDirection: Math.random() > 0.5 ? 1 : -1,
        rotation: 0
    };

    return emoji;
}

function setupEmoji(x, y) {
    const emoji = createEmoji();
    positionElement(emoji, x, y);
    updateEmojiStyle(emoji);
    document.body.appendChild(emoji);
    return emoji;
}

function updateEmojiStyle(emoji) {
    const data = emoji.emojiData;
    emoji.style.transform = `translate(-50%, -50%) scale(${data.scale}) rotate(${data.rotation}deg)`;
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
    addEmojis(100);
    animateEmojis();
    document.addEventListener('click', handleClick);
}

initialize();