// Pac-Man Game - Pure JavaScript

const TILE = 20;
const COLS = 28;
const ROWS = 29;

// 0=wall, 1=dot, 2=power, 3=empty
const MAZE = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,2,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,1,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,2,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0]
];

const GHOST_COLORS = ['#ff0000', '#ffb8ff', '#00ffff', '#ffb852'];

let canvas, ctx;
let score = 0, lives = 3;
let gameRunning = false;
let dots = [], powerDots = [];
let pacman = { x: 14, y: 23, dir: 0, nextDir: 0, mouth: 0 };
let ghosts = [];
let gameLoop;

function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    document.getElementById('startBtn').onclick = startGame;
    document.onkeydown = e => {
        if ([37,38,39,40].includes(e.keyCode)) e.preventDefault();
        if (e.key === 'ArrowRight') pacman.nextDir = 0;
        if (e.key === 'ArrowDown') pacman.nextDir = 1;
        if (e.key === 'ArrowLeft') pacman.nextDir = 2;
        if (e.key === 'ArrowUp') pacman.nextDir = 3;
    };
    resetGame();
    draw();
}

function resetGame() {
    dots = []; powerDots = [];
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (MAZE[y][x] === 1) dots.push({x, y});
            if (MAZE[y][x] === 2) powerDots.push({x, y});
        }
    }
    ghosts = [
        {x: 13, y: 14, dir: 0, color: GHOST_COLORS[0]},
        {x: 14, y: 14, dir: 2, color: GHOST_COLORS[1]},
        {x: 12, y: 14, dir: 1, color: GHOST_COLORS[2]},
        {x: 15, y: 14, dir: 3, color: GHOST_COLORS[3]}
    ];
    pacman.x = 14; pacman.y = 23; pacman.dir = 0;
}

function canMove(x, y, d) {
    let nx = x, ny = y;
    if (d === 0) nx++;
    if (d === 1) ny++;
    if (d === 2) nx--;
    if (d === 3) ny--;
    
    // Check bounds - don't allow going outside maze
    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) return false;
    
    // Check if it's a wall
    return MAZE[ny] && MAZE[ny][nx] !== 0;
}

function update() {
    pacman.mouth = (pacman.mouth + 0.2) % Math.PI;
    
    if (canMove(pacman.x, pacman.y, pacman.nextDir)) pacman.dir = pacman.nextDir;
    if (canMove(pacman.x, pacman.y, pacman.dir)) {
        if (pacman.dir === 0) pacman.x++;
        if (pacman.dir === 1) pacman.y++;
        if (pacman.dir === 2) pacman.x--;
        if (pacman.dir === 3) pacman.y--;
    }
    
    // Keep within bounds
    if (pacman.x < 0) pacman.x = 0;
    if (pacman.x >= COLS) pacman.x = COLS - 1;
    if (pacman.y < 0) pacman.y = 0;
    if (pacman.y >= ROWS) pacman.y = ROWS - 1;
    
    // Eat dots
    for (let i = dots.length - 1; i >= 0; i--) {
        if (dots[i].x === pacman.x && dots[i].y === pacman.y) {
            dots.splice(i, 1);
            score += 10;
            updateUI();
        }
    }
    
    // Eat power
    for (let i = powerDots.length - 1; i >= 0; i--) {
        if (powerDots[i].x === pacman.x && powerDots[i].y === pacman.y) {
            powerDots.splice(i, 1);
            score += 50;
            updateUI();
        }
    }
    
    // Ghosts move
    ghosts.forEach(g => {
        const dirs = [0,1,2,3].filter(d => canMove(g.x, g.y, d));
        if (dirs.length && Math.random() < 0.1) g.dir = dirs[Math.floor(Math.random() * dirs.length)];
        if (canMove(g.x, g.y, g.dir)) {
            if (g.dir === 0) g.x++;
            if (g.dir === 1) g.y++;
            if (g.dir === 2) g.x--;
            if (g.dir === 3) g.y--;
            if (g.x < 0) g.x = COLS - 1;
            if (g.x >= COLS) g.x = 0;
        }
    });
    
    // Collision
    ghosts.forEach(g => {
        if (g.x === pacman.x && g.y === pacman.y) {
            lives--;
            updateUI();
            if (lives <= 0) {
                gameOver(false);
            } else {
                pacman.x = 14; pacman.y = 23;
            }
        }
    });
    
    if (dots.length === 0 && powerDots.length === 0) {
        gameOver(true);
    }
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Walls
    ctx.fillStyle = '#1c8eff';
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (MAZE[y][x] === 0) {
                ctx.fillRect(x * TILE + 1, y * TILE + 1, TILE - 2, TILE - 2);
            }
        }
    }
    
    // Dots
    ctx.fillStyle = '#ffb8ff';
    dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x * TILE + 10, d.y * TILE + 10, 2, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Power dots
    ctx.fillStyle = '#ffb852';
    powerDots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x * TILE + 10, d.y * TILE + 10, 6, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Pac-Man
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    const angle = pacman.dir * Math.PI / 2;
    const mouth = 0.25 * Math.PI * Math.abs(Math.sin(pacman.mouth));
    ctx.arc(pacman.x * TILE + 10, pacman.y * TILE + 10, 8, angle + mouth, angle + Math.PI * 2 - mouth);
    ctx.lineTo(pacman.x * TILE + 10, pacman.y * TILE + 10);
    ctx.fill();
    
    // Ghosts
    ghosts.forEach(g => {
        ctx.fillStyle = g.color;
        ctx.beginPath();
        ctx.arc(g.x * TILE + 10, g.y * TILE + 8, 8, Math.PI, 0);
        ctx.lineTo(g.x * TILE + 18, g.y * TILE + 18);
        ctx.lineTo(g.x * TILE + 2, g.y * TILE + 18);
        ctx.closePath();
        ctx.fill();
        
        // Eyes
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(g.x * TILE + 6, g.y * TILE + 7, 3, 0, Math.PI * 2);
        ctx.arc(g.x * TILE + 14, g.y * TILE + 7, 3, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
}

function gameOver(win) {
    gameRunning = false;
    clearInterval(gameLoop);
    alert(win ? 'YOU WIN! Score: ' + score : 'GAME OVER! Score: ' + score);
}

function startGame() {
    resetGame();
    score = 0;
    lives = 3;
    gameRunning = true;
    updateUI();
    document.getElementById('startBtn').textContent = 'RESTART';
    
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(() => {
        if (gameRunning) {
            update();
            draw();
        }
    }, 150);
}

init();
