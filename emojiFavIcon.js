const setFavicon = (emoji) => {
    const canvas = document.createElement('canvas');
    canvas.height = 32;
    canvas.width = 32;

    const ctx = canvas.getContext('2d');
    ctx.font = '24px sans-serif';
    ctx.fillText(emoji, 5, 24);

    const favicon = document.querySelector("link[rel~='icon']");
    if (favicon) { favicon.href = canvas.toDataURL(); }
}

var iconCount = 0;
var icons = ["👖", "🐸"];
function iconLoop() {
    if (iconCount >= icons.length) {
        iconCount = 0;
    }
    setFavicon(icons[iconCount]);
    iconCount++;
    setTimeout(iconLoop, 2000);
}

iconLoop();