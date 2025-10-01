// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const isCollab = document.getElementById('collab').checked;
    
    const subject = isCollab ? 'Brand Collaboration Inquiry' : 'Contact from Portfolio';
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    window.location.href = `mailto:nirmitshah@gmail.com?subject=${subject}&body=${body}`;
});



// Puzzle Game Logic
let puzzleState = [];
let moves = 0;
let startTime = null;
let timerInterval = null;

// Initialize puzzle
function initPuzzle() {
    puzzleState = [];
    for (let i = 1; i <= 15; i++) {
        puzzleState.push(i);
    }
    puzzleState.push(null); // Empty space
    renderPuzzle();
}

// Render puzzle
function renderPuzzle() {
    const grid = document.getElementById('puzzleGrid');
    if (!grid) return; // Exit if grid doesn't exist
    
    grid.innerHTML = '';
    
    puzzleState.forEach((value, index) => {
        const tile = document.createElement('div');
        
        if (value === null) {
            tile.className = 'puzzle-tile empty';
        } else {
            tile.className = 'puzzle-tile';
            tile.textContent = value;
        }
        
        tile.onclick = () => moveTile(index);
        grid.appendChild(tile);
    });
}

// Move tile
function moveTile(index) {
    const emptyIdx = puzzleState.indexOf(null);
    const validMoves = getValidMoves(emptyIdx);
    
    if (validMoves.includes(index)) {
        // Swap tiles
        [puzzleState[index], puzzleState[emptyIdx]] = [puzzleState[emptyIdx], puzzleState[index]];
        moves++;
        const movesElement = document.getElementById('moves');
        if (movesElement) movesElement.textContent = moves;
        
        if (!startTime) {
            startTimer();
        }
        
        renderPuzzle();
        
        // Check for win
        if (checkWin()) {
            stopTimer();
            alert('🎉 Congratulations! You solved the puzzle!');
        }
    }
}

// Get valid moves
function getValidMoves(emptyIdx) {
    const validMoves = [];
    const row = Math.floor(emptyIdx / 4);
    const col = emptyIdx % 4;
    
    if (row > 0) validMoves.push(emptyIdx - 4); // Up
    if (row < 3) validMoves.push(emptyIdx + 4); // Down
    if (col > 0) validMoves.push(emptyIdx - 1); // Left
    if (col < 3) validMoves.push(emptyIdx + 1); // Right
    
    return validMoves;
}

// Shuffle puzzle
function shufflePuzzle() {
    resetStats();
    
    // Perform 150 random valid moves
    for (let i = 0; i < 150; i++) {
        const emptyIdx = puzzleState.indexOf(null);
        const validMoves = getValidMoves(emptyIdx);
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        
        [puzzleState[randomMove], puzzleState[emptyIdx]] = [puzzleState[emptyIdx], puzzleState[randomMove]];
    }
    
    renderPuzzle();
    startTimer();
}

// Reset puzzle
function resetPuzzle() {
    resetStats();
    initPuzzle();
}

// Show hint
function showHint() {
    const emptyIdx = puzzleState.indexOf(null);
    const validMoves = getValidMoves(emptyIdx);
    
    if (validMoves.length > 0) {
        const tiles = document.querySelectorAll('.puzzle-tile');
        tiles[validMoves[0]].style.background = '#fbbf24';
        
        setTimeout(() => {
            tiles[validMoves[0]].style.background = '';
        }, 1000);
    }
}

// Check win
function checkWin() {
    for (let i = 0; i < 15; i++) {
        if (puzzleState[i] !== i + 1) return false;
    }
    return puzzleState[15] === null;
}

// Reset stats
function resetStats() {
    moves = 0;
    const movesElement = document.getElementById('moves');
    if (movesElement) movesElement.textContent = moves;
    
    stopTimer();
    const timerElement = document.getElementById('timer');
    if (timerElement) timerElement.textContent = '00:00';
    
    startTime = null;
}

// Timer functions
function startTimer() {
    if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimer() {
    if (!startTime) return;
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = `${minutes}:${seconds}`;
    }
}

// Initialize puzzle when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('puzzleGrid')) {
        initPuzzle();
    }
});


// Hamburger Menu Toggle
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Create or toggle overlay
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        overlay.onclick = closeMenu;
        document.body.appendChild(overlay);
    }
    overlay.classList.toggle('active');
}

// Close menu function
function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    const overlay = document.querySelector('.menu-overlay');
    
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    body.classList.remove('menu-open');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

// Close menu on window resize if open
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});
