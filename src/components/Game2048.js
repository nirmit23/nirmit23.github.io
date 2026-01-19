import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Trophy, Target, Timer } from 'lucide-react';
import './Game2048.css';

export default function Game2048() {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const createEmptyGrid = () => {
    return Array(4).fill(null).map(() => Array(4).fill(0));
  };

  const addRandomTile = useCallback((currentGrid) => {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentGrid[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }

    if (emptyCells.length > 0) {
      const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentGrid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
    return currentGrid;
  }, []);

  const initializeGame = useCallback(() => {
    const newGrid = createEmptyGrid();
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setGameStarted(true);
  }, [addRandomTile]);

  useEffect(() => {
    const saved = localStorage.getItem('2048-best-score');
    if (saved) setBestScore(parseInt(saved));
    initializeGame();
  }, [initializeGame]);

  const moveLeft = (row) => {
    let newRow = row.filter(val => val !== 0);
    let points = 0;

    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        points += newRow[i];
        newRow[i + 1] = 0;
        
        if (newRow[i] === 2048 && !won) {
          setWon(true);
        }
      }
    }

    newRow = newRow.filter(val => val !== 0);
    while (newRow.length < 4) {
      newRow.push(0);
    }

    return { row: newRow, points };
  };

  const rotateGrid = (grid) => {
    const newGrid = createEmptyGrid();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        newGrid[i][j] = grid[3 - j][i];
      }
    }
    return newGrid;
  };

  const move = useCallback((direction) => {
    if (gameOver) return;

    let newGrid = grid.map(row => [...row]);
    let totalPoints = 0;
    let moved = false;

    if (direction === 'left') {
      for (let i = 0; i < 4; i++) {
        const { row, points } = moveLeft(newGrid[i]);
        newGrid[i] = row;
        totalPoints += points;
      }
    } else if (direction === 'right') {
      for (let i = 0; i < 4; i++) {
        const reversed = [...newGrid[i]].reverse();
        const { row, points } = moveLeft(reversed);
        newGrid[i] = row.reverse();
        totalPoints += points;
      }
    } else if (direction === 'up') {
      newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
      for (let i = 0; i < 4; i++) {
        const { row, points } = moveLeft(newGrid[i]);
        newGrid[i] = row;
        totalPoints += points;
      }
      newGrid = rotateGrid(newGrid);
    } else if (direction === 'down') {
      newGrid = rotateGrid(newGrid);
      for (let i = 0; i < 4; i++) {
        const { row, points } = moveLeft(newGrid[i]);
        newGrid[i] = row;
        totalPoints += points;
      }
      newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] !== newGrid[i][j]) {
          moved = true;
          break;
        }
      }
      if (moved) break;
    }

    if (moved) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      const newScore = score + totalPoints;
      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem('2048-best-score', newScore.toString());
      }

      if (!canMove(newGrid)) {
        setGameOver(true);
      }
    }
  }, [grid, score, bestScore, gameOver, won, addRandomTile]);

  const canMove = (grid) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) return true;
        if (j < 3 && grid[i][j] === grid[i][j + 1]) return true;
        if (i < 3 && grid[i][j] === grid[i + 1][j]) return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || (gameOver && !won)) return;
      
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        
        if (e.key === 'ArrowLeft') move('left');
        if (e.key === 'ArrowRight') move('right');
        if (e.key === 'ArrowUp') move('up');
        if (e.key === 'ArrowDown') move('down');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, gameStarted, gameOver, won]);

  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!gameStarted || (gameOver && !won)) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const minSwipe = 50;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipe) {
          deltaX > 0 ? move('right') : move('left');
        }
      } else {
        if (Math.abs(deltaY) > minSwipe) {
          deltaY > 0 ? move('down') : move('up');
        }
      }
    };

    const gameBoard = document.querySelector('.game2048-board');
    if (gameBoard) {
      gameBoard.addEventListener('touchstart', handleTouchStart);
      gameBoard.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (gameBoard) {
        gameBoard.removeEventListener('touchstart', handleTouchStart);
        gameBoard.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [move, gameStarted, gameOver, won]);

  return (
    <div className="game2048-wrapper">
      <div className="game2048-container">
        <div className="puzzle-stats">
          <div className="puzzle-stat">
            <Target size={18} />
            <div className="stat-info">
              <span className="puzzle-stat-label">Score</span>
              <span className="puzzle-stat-value">{score}</span>
            </div>
          </div>
          <div className="puzzle-stat">
            <Trophy size={18} />
            <div className="stat-info">
              <span className="puzzle-stat-label">Best</span>
              <span className="puzzle-stat-value">{bestScore}</span>
            </div>
          </div>
        </div>

        <div className="game2048-board">
          {grid.map((row, i) => (
            <div key={i} className="game2048-row">
              {row.map((cell, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`game2048-cell ${cell === 0 ? 'tile-empty' : ''}`}
                  data-value={cell}
                >
                  {cell !== 0 && cell}
                </div>
              ))}
            </div>
          ))}

          {gameOver && (
            <div className="game2048-overlay">
              <div className="overlay-content">
                <h3>Game Over!</h3>
                <p className="final-score">Score: {score}</p>
                {score === bestScore && score > 0 && (
                  <p className="new-record">New Best Score!</p>
                )}
                <button onClick={initializeGame} className="restart-btn">
                  Play Again
                </button>
              </div>
            </div>
          )}

          {won && !gameOver && (
            <div className="game2048-overlay win">
              <div className="overlay-content">
                <h3>🎉 You Win! 🎉</h3>
                <p className="win-message">You reached 2048!</p>
                <div className="win-buttons">
                  <button onClick={initializeGame} className="restart-btn">
                    New Game
                  </button>
                  <button onClick={() => setWon(false)} className="continue-btn">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="puzzle-controls">
          <button onClick={initializeGame} className="puzzle-btn">
            <RotateCcw size={18} />
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}