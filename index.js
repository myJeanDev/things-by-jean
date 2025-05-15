function getRandomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function positionElement(element, x, y) {
    element.style.position = "absolute";
    element.style.left = x + "%";
    element.style.top = y + "%";
}

function moveLeafDown(leaf) {
    const speed = parseFloat(leaf.getAttribute('data-speed') || '0.1');
    const currentTop = parseFloat(leaf.style.top);
    let newTop = currentTop + speed;
    
    if (newTop > 110) {
        newTop = -10;
    }
    
    leaf.style.top = newTop + "%";
}

let svgTemplate = null;

async function loadSvgTemplate() {
    if (svgTemplate) return svgTemplate;
    
    try {
        const response = await fetch('leaf.svg');
        if (!response.ok) throw new Error(`Failed to load SVG: ${response.statusText}`);
        svgTemplate = await response.text();
        return svgTemplate;
    } catch (error) {
        console.error('Error loading SVG:', error);
        return '<svg></svg>';
    }
}

async function createLeaf() {
    const svgContent = await loadSvgTemplate();
    
    const leaf = document.createElement('div');
    leaf.classList.add('svgLeaf');
    leaf.innerHTML = svgContent;
    
    // Make SVG responsive
    const svg = leaf.querySelector('svg');
    if (svg) {
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
    }
    
    // Set basic styles
    leaf.style.position = 'absolute';
    leaf.style.width = '40px';
    leaf.style.height = '60px';
    
    // Set rotation properties
    const rotationSpeed = getRandomBetween(0.5, 3);
    const rotationDirection = Math.random() > 0.5 ? 1 : -1;
    
    leaf.setAttribute('data-rotation-speed', rotationSpeed);
    leaf.setAttribute('data-rotation-direction', rotationDirection);
    leaf.setAttribute('data-current-rotation', '0');
    
    return leaf;
}

async function addLeaves(count) {
    // Calculate grid for even distribution
    const columns = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / columns);
    const cellWidth = 100 / columns;
    const cellHeight = 100 / rows;
    
    let leafCount = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            if (leafCount >= count) break;
            
            const leaf = await createLeaf();
            
            // Position in grid with slight random offset
            const x = cellWidth * col + (cellWidth / 2) + getRandomBetween(-cellWidth * 0.2, cellWidth * 0.2);
            const y = cellHeight * row + (cellHeight / 2) + getRandomBetween(-cellHeight * 0.2, cellHeight * 0.2);
            
            // Random attributes
            const opacity = getRandomBetween(0.4, 1.0);
            const size = getRandomBetween(0.8, 1.5);
            const speed = getRandomBetween(0.05, 0.3);
            
            positionElement(leaf, x, y);
            leaf.style.opacity = opacity;
            leaf.style.transform = `translate(-50%, -50%) scale(${size})`;
            
            leaf.setAttribute('data-scale', size);
            leaf.setAttribute('data-speed', speed);
            
            document.body.appendChild(leaf);
            leafCount++;
        }
    }
}

function updateLeafRotation(leaf) {
    const speed = parseFloat(leaf.getAttribute('data-rotation-speed') || '1');
    const direction = parseInt(leaf.getAttribute('data-rotation-direction') || '1');
    let rotation = parseFloat(leaf.getAttribute('data-current-rotation') || '0');
    
    rotation = (rotation + speed * direction) % 360;
    leaf.setAttribute('data-current-rotation', rotation.toString());
    
    const scale = leaf.getAttribute('data-scale') || '1';
    leaf.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
}

function animateLeaves() {
    const leaves = document.querySelectorAll('.svgLeaf');
    
    leaves.forEach(leaf => {
        moveLeafDown(leaf);
        updateLeafRotation(leaf);
    });
    
    requestAnimationFrame(animateLeaves);
}

async function handleClick(event) {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    
    const leaf = await createLeaf();
    
    positionElement(leaf, x, y);
    
    const opacity = getRandomBetween(0.4, 1.0);
    const size = getRandomBetween(0.8, 1.5);
    const speed = getRandomBetween(0.05, 0.3);
    
    leaf.style.opacity = opacity;
    leaf.style.transform = `translate(-50%, -50%) scale(${size})`;
    
    leaf.setAttribute('data-scale', size);
    leaf.setAttribute('data-speed', speed);
    
    document.body.appendChild(leaf);
}

async function initialize() {
    await addLeaves(10);
    animateLeaves();
    document.addEventListener('click', handleClick);
}

initialize();