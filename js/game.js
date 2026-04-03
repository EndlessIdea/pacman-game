// Pac-Man Game with Phaser.js
// Traditional arcade game rules

const TILE_SIZE = 20;
const COLS = 28;
const ROWS = 36;

// Classic maze layout (0=wall, 1=dot, 2=power, 3=empty, 4=ghost house)
const MAZE = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,2,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,2,1,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,2,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

// Game state
let game;
let score = 0;
let lives = 3;
let level = 1;
let gameOver = false;
let pacman;
let ghosts = [];
let dots = [];
let powerPellets = [];
let currentDirection = null;
let nextDirection = null;

// Ghost colors
const GHOST_COLORS = ['#ff0000', '#ffb8ff', '#00ffff', '#ffb852'];

class PacManGame extends Phaser.Scene {
    constructor() {
        super({ key: 'PacManGame' });
    }

    preload() {
        // Create procedural graphics
        this.createPacManTexture();
        this.createGhostTextures();
        this.createDotTextures();
    }

    createPacManTexture() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        
        // Yellow circle with mouth
        graphics.fillStyle(0xffff00);
        graphics.slice(16, 16, 14, 0, Math.PI * 1.75, false);
        graphics.fill();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokePath();
        
        graphics.generateTexture('pacman', 32, 32);
        graphics.destroy();
    }

    createGhostTextures() {
        GHOST_COLORS.forEach((color, index) => {
            const graphics = this.make.graphics({ x: 0, y: 0, add: false });
            
            // Ghost body
            graphics.fillStyle(parseInt(color.replace('#', '0x')));
            graphics.beginPath();
            graphics.arc(16, 14, 12, Math.PI, 0);
            graphics.lineTo(28, 28);
            graphics.lineTo(4, 28);
            graphics.closePath();
            graphics.fillPath();
            
            // Eyes
            graphics.fillStyle(0xffffff);
            graphics.fillCircle(10, 12, 5);
            graphics.fillCircle(22, 12, 5);
            graphics.fillStyle(0x0000ff);
            graphics.fillCircle(12, 12, 3);
            graphics.fillCircle(24, 12, 3);
            
            graphics.generateTexture('ghost' + index, 32, 32);
            graphics.destroy();
        });
    }

    createDotTextures() {
        // Small dot
        let graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xffb8ff);
        graphics.fillCircle(4, 4, 3);
        graphics.generateTexture('dot', 8, 8);
        graphics.destroy();
        
        // Power pellet
        graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xffb852);
        graphics.fillCircle(8, 8, 7);
        graphics.generateTexture('power', 16, 16);
        graphics.destroy();
        
        // Wall
        graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x1c8eff);
        graphics.fillRect(0, 0, 20, 20);
        graphics.generateTexture('wall', 20, 20);
        graphics.destroy();
    }

    create() {
        // Calculate game dimensions
        const width = COLS * TILE_SIZE;
        const height = ROWS * TILE_SIZE;
        
        this.scale.setGameSize(width, height);
        
        // Create maze
        this.createMaze();
        
        // Create Pac-Man
        pacman = this.physics.add.sprite(14 * TILE_SIZE + 10, 23 * TILE_SIZE + 10, 'pacman');
        pacman.setCollideWorldBounds(true);
        pacman.setCollideWorldBounds(true);
        
        // Create ghosts
        this.createGhosts();
        
        // Setup controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // Setup collision
        this.physics.add.overlap(pacman, dots, this.eatDot, null, this);
        this.physics.add.overlap(pacman, powerPellets, this.eatPowerPellet, null, this);
        this.physics.add.overlap(pacman, ghosts, this.hitGhost, null, this);
        
        // Update UI
        this.updateUI();
    }

    createMaze() {
        dots = [];
        powerPellets = [];
        
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const x = col * TILE_SIZE + 10;
                const y = row * TILE_SIZE + 10;
                
                if (MAZE[row][col] === 0) {
                    // Wall
                    const wall = this.add.image(x, y, 'wall');
                } else if (MAZE[row][col] === 1) {
                    // Dot
                    const dot = this.physics.add.sprite(x, y, 'dot');
                    dot.body.setSize(6, 6);
                    dots.push(dot);
                } else if (MAZE[row][col] === 2) {
                    // Power pellet
                    const pellet = this.physics.add.sprite(x, y, 'power');
                    pellet.body.setSize(12, 12);
                    powerPellets.push(pellet);
                }
            }
        }
    }

    createGhosts() {
        ghosts = [];
        const startPositions = [
            { x: 12, y: 14 },
            { x: 13, y: 14 },
            { x: 14, y: 14 },
            { x: 15, y: 14 }
        ];
        
        startPositions.forEach((pos, i) => {
            const ghost = this.physics.add.sprite(pos.x * TILE_SIZE + 10, pos.y * TILE_SIZE + 10, 'ghost' + i);
            ghost.setCollideWorldBounds(true);
            ghost.setBounce(1);
            ghost.setVelocity(50, 50);
            ghost.setCollideWorldBounds(false);
            ghost.direction = Math.floor(Math.random() * 4);
            ghosts.push(ghost);
        });
    }

    eatDot(pac, dot) {
        dot.destroy();
        score += 10;
        this.updateUI();
        
        // Check win
        if (dots.length === 0 && powerPellets.length === 0) {
            this.levelComplete();
        }
    }

    eatPowerPellet(pac, pellet) {
        pellet.destroy();
        score += 50;
        this.updateUI();
        
        // Make ghosts edible
        ghosts.forEach(ghost => {
            ghost.setTint(0x888888);
            ghost.edible = true;
            ghost.setVelocity(30, 30);
        });
        
        // Reset after 10 seconds
        this.time.delayedCall(10000, () => {
            ghosts.forEach(ghost => {
                ghost.clearTint();
                ghost.edible = false;
                ghost.setVelocity(50, 50);
            });
        });
        
        if (dots.length === 0 && powerPellets.length === 0) {
            this.levelComplete();
        }
    }

    hitGhost(pac, ghost) {
        if (ghost.edible) {
            // Eat ghost
            ghost.x = 14 * TILE_SIZE + 10;
            ghost.y = 14 * TILE_SIZE + 10;
            ghost.setVelocity(30, 30);
            score += 200;
            this.updateUI();
        } else {
            // Lose life
            lives--;
            this.updateUI();
            
            if (lives <= 0) {
                this.gameOver();
            } else {
                // Reset positions
                pac.x = 14 * TILE_SIZE + 10;
                pac.y = 23 * TILE_SIZE + 10;
            }
        }
    }

    levelComplete() {
        level++;
        this.scene.restart();
    }

    gameOver() {
        gameOver = true;
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('overlay-title').textContent = 'YOU WIN!';
    }

    updateUI() {
        document.getElementById('score-value').textContent = score;
        document.getElementById('lives-value').textContent = lives;
        document.getElementById('level-value').textContent = level;
    }

    update() {
        if (gameOver) {
            if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
                this.restartGame();
            }
            return;
        }

        // Pac-Man movement
        this.handlePacManMovement();
        
        // Ghost AI
        this.updateGhosts();
        
        // Screen wrap
        if (pacman.x < 0) pacman.x = COLS * TILE_SIZE;
        if (pacman.x > COLS * TILE_SIZE) pacman.x = 0;
    }

    handlePacManMovement() {
        let velocityX = 0;
        let velocityY = 0;
        const speed = 100;
        
        if (this.cursors.left.isDown) {
            velocityX = -speed;
        } else if (this.cursors.right.isDown) {
            velocityX = speed;
        } else if (this.cursors.up.isDown) {
            velocityY = -speed;
        } else if (this.cursors.down.isDown) {
            velocityY = speed;
        }
        
        pacman.setVelocity(velocityX, velocityY);
        
        // Rotate based on direction
        if (velocityX < 0) pacman.angle = 180;
        else if (velocityX > 0) pacman.angle = 0;
        else if (velocityY < 0) pacman.angle = -90;
        else if (velocityY > 0) pacman.angle = 90;
    }

    updateGhosts() {
        ghosts.forEach(ghost => {
            // Random direction change
            if (Math.random() < 0.02) {
                const dirs = [
                    { x: 50, y: 0 },
                    { x: -50, y: 0 },
                    { x: 0, y: 50 },
                    { x: 0, y: -50 }
                ];
                const dir = dirs[Math.floor(Math.random() * dirs.length)];
                ghost.setVelocity(dir.x, dir.y);
            }
            
            // Screen wrap
            if (ghost.x < 0) ghost.x = COLS * TILE_SIZE;
            if (ghost.x > COLS * TILE_SIZE) ghost.x = 0;
        });
    }

    restartGame() {
        score = 0;
        lives = 3;
        level = 1;
        gameOver = false;
        document.getElementById('overlay').style.display = 'none';
        this.scene.restart();
    }
}

// Start game when page loads
window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        width: COLS * TILE_SIZE,
        height: ROWS * TILE_SIZE,
        parent: 'game-container',
        backgroundColor: '#000000',
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: PacManGame
    };
    
    game = new Phaser.Game(config);
};
