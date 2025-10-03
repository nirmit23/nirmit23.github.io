import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, Pause, Play } from 'lucide-react';
import './SnakeGame.css';

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([[8, 8]]);
  const [food, setFood] = useState([12, 12]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const gridSize = 20;
  const cellSize = 20;
  const gameSpeed = 150;

  useEffect(() => {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * gridSize),
        Math.floor(Math.random() * gridSize)
      ];
    } while (currentSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
    return newFood;
  }, []);

  const resetGame = () => {
    const initialSnake = [[8, 8]];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setGameStarted(false);
  };

  const handleKeyPress = useCallback((e) => {
    if (gameOver) return;
    
    if (e.key === ' ') {
      e.preventDefault();
      if (!gameStarted) {
        setGameStarted(true);
      } else {
        setIsPaused(prev => !prev);
      }
      return;
    }

    if (!gameStarted || isPaused) return;

    switch(e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setDirection(prev => prev !== 'DOWN' ? 'UP' : prev);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setDirection(prev => prev !== 'UP' ? 'DOWN' : prev);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev);
        break;
      case 'ArrowRight':
        e.preventDefault();
        setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev);
        break;
      default:
        break;
    }
  }, [gameOver, gameStarted, isPaused]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!gameStarted || isPaused || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        let newHead;

        switch(direction) {
          case 'UP':
            newHead = [head[0], head[1] - 1];
            break;
          case 'DOWN':
            newHead = [head[0], head[1] + 1];
            break;
          case 'LEFT':
            newHead = [head[0] - 1, head[1]];
            break;
          case 'RIGHT':
            newHead = [head[0] + 1, head[1]];
            break;
          default:
            newHead = head;
        }

        // Check wall collision
        if (newHead[0] < 0 || newHead[0] >= gridSize || newHead[1] < 0 || newHead[1] >= gridSize) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(prev => {
            const newScore = prev + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('snakeHighScore', newScore.toString());
            }
            return newScore;
          });
          setFood(generateFood(newSnake));
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, gameSpeed);
    return () => clearInterval(interval);
  }, [direction, food, gameOver, gameStarted, isPaused, generateFood, highScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(91, 155, 213, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, gridSize * cellSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(gridSize * cellSize, i * cellSize);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(
      food[0] * cellSize + cellSize / 2,
      food[1] * cellSize + cellSize / 2,
      cellSize / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw snake with distinct head and tail
    snake.forEach((segment, index) => {
      const x = segment[0] * cellSize;
      const y = segment[1] * cellSize;

      if (index === 0) {
        // Draw head
        ctx.fillStyle = '#5B9BD5';
        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        
        // Draw eyes based on direction
        ctx.fillStyle = '#ffffff';
        let eye1X, eye1Y, eye2X, eye2Y;
        
        switch(direction) {
          case 'UP':
            eye1X = x + 6;
            eye1Y = y + 6;
            eye2X = x + cellSize - 6;
            eye2Y = y + 6;
            break;
          case 'DOWN':
            eye1X = x + 6;
            eye1Y = y + cellSize - 6;
            eye2X = x + cellSize - 6;
            eye2Y = y + cellSize - 6;
            break;
          case 'LEFT':
            eye1X = x + 6;
            eye1Y = y + 6;
            eye2X = x + 6;
            eye2Y = y + cellSize - 6;
            break;
          case 'RIGHT':
            eye1X = x + cellSize - 6;
            eye1Y = y + 6;
            eye2X = x + cellSize - 6;
            eye2Y = y + cellSize - 6;
            break;
          default:
            eye1X = x + cellSize - 6;
            eye1Y = y + 6;
            eye2X = x + cellSize - 6;
            eye2Y = y + cellSize - 6;
        }
        
        ctx.beginPath();
        ctx.arc(eye1X, eye1Y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eye2X, eye2Y, 2, 0, Math.PI * 2);
        ctx.fill();
        
      } else if (index === snake.length - 1) {
        // Draw tail - smaller and tapered
        ctx.fillStyle = '#4A8BC4';
        const tailSize = cellSize - 6;
        const offset = 3;
        ctx.fillRect(x + offset, y + offset, tailSize, tailSize);
        
        // Add rounded tip to tail
        ctx.beginPath();
        ctx.arc(
          x + cellSize / 2,
          y + cellSize / 2,
          tailSize / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      } else {
        // Draw body segments with gradient effect
        const gradient = ctx.createLinearGradient(x, y, x + cellSize, y + cellSize);
        gradient.addColorStop(0, '#93C5FD');
        gradient.addColorStop(1, '#5B9BD5');
        ctx.fillStyle = gradient;
        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
      }
    });
  }, [snake, food, direction]);

  const startGame = () => {
    setGameStarted(true);
  };

  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setIsPaused(prev => !prev);
    }
  };

  return (
    <div className="snake-game-wrapper">
      <div className="snake-game-container">
        {/* Header */}
        <div className="snake-header">
          <div className="snake-scores">
            <div className="snake-score-card">
              <div className="score-label">Score</div>
              <div className="score-value">{score}</div>
            </div>
            <div className="snake-score-card">
              <div className="score-label">High Score</div>
              <div className="score-value">{highScore}</div>
            </div>
          </div>
        </div>

        {/* Game Canvas */}
        <div className="snake-canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={gridSize * cellSize}
            height={gridSize * cellSize}
            className="snake-canvas"
          />
          
          {!gameStarted && (
            <div className="snake-overlay">
              <div className="overlay-content">
                <h3>Snake Game</h3>
                <p>Use arrow keys to control the snake</p>
                <button onClick={startGame} className="start-btn">
                  Start Game
                </button>
              </div>
            </div>
          )}

          {isPaused && gameStarted && !gameOver && (
            <div className="snake-overlay">
              <div className="overlay-content">
                <h3>Paused</h3>
                <p>Press Space or click Play to continue</p>
              </div>
            </div>
          )}

          {gameOver && (
            <div className="snake-overlay">
              <div className="overlay-content">
                <h3>Game Over!</h3>
                <p className="final-score">Score: {score}</p>
                {score === highScore && score > 0 && (
                  <p className="new-record">New High Score!</p>
                )}
                <button onClick={resetGame} className="restart-btn">
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="snake-controls">
          <button
            onClick={togglePause}
            disabled={!gameStarted || gameOver}
            className="control-btn"
          >
            {isPaused ? <Play className="btn-icon" /> : <Pause className="btn-icon" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button onClick={resetGame} className="control-btn secondary">
            <RotateCcw className="btn-icon" />
            Reset
          </button>
        </div>

        {/* Instructions */}
        <div className="snake-instructions">
          <p><strong>Controls:</strong> Arrow Keys to move • Space to Pause/Resume</p>
          <p><strong>Goal:</strong> Eat the red food to grow and score points!</p>
        </div>
      </div>
    </div>
  );
}