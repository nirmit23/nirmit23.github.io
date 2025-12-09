import React, { useState, useEffect } from 'react';

export default function SlidingPuzzle() {
  const [puzzleState, setPuzzleState] = useState([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState('00:00');
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    initPuzzle();
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    if (startTime && !timerInterval) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        setTimer(`${minutes}:${seconds}`);
      }, 1000);
      setTimerInterval(interval);
    }
  }, [startTime]);

  const initPuzzle = () => {
    const state = [];
    for (let i = 1; i <= 15; i++) {
      state.push(i);
    }
    state.push(null);
    setPuzzleState(state);
  };

  const getValidMoves = (emptyIdx) => {
    const validMoves = [];
    const row = Math.floor(emptyIdx / 4);
    const col = emptyIdx % 4;
    
    if (row > 0) validMoves.push(emptyIdx - 4);
    if (row < 3) validMoves.push(emptyIdx + 4);
    if (col > 0) validMoves.push(emptyIdx - 1);
    if (col < 3) validMoves.push(emptyIdx + 1);
    
    return validMoves;
  };

  const moveTile = (index) => {
    const emptyIdx = puzzleState.indexOf(null);
    const validMoves = getValidMoves(emptyIdx);
    
    if (validMoves.includes(index)) {
      const newState = [...puzzleState];
      [newState[index], newState[emptyIdx]] = [newState[emptyIdx], newState[index]];
      setPuzzleState(newState);
      setMoves(moves + 1);
      
      if (!startTime) {
        setStartTime(Date.now());
      }
      
      if (checkWin(newState)) {
        stopTimer();
        setTimeout(() => {
          alert('🎉 Congratulations! You solved the puzzle!');
        }, 300);
      }
    }
  };

  const shufflePuzzle = () => {
    resetStats();
    let state = [...puzzleState];
    
    for (let i = 0; i < 150; i++) {
      const emptyIdx = state.indexOf(null);
      const validMoves = getValidMoves(emptyIdx);
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      
      [state[randomMove], state[emptyIdx]] = [state[emptyIdx], state[randomMove]];
    }
    
    setPuzzleState(state);
    setStartTime(Date.now());
  };

  const resetPuzzle = () => {
    resetStats();
    initPuzzle();
  };

  const showHint = () => {
    const emptyIdx = puzzleState.indexOf(null);
    const validMoves = getValidMoves(emptyIdx);
    
    if (validMoves.length > 0) {
      const hintElement = document.querySelector(`[data-index="${validMoves[0]}"]`);
      if (hintElement) {
        hintElement.style.background = '#fbbf24';
        setTimeout(() => {
          hintElement.style.background = '';
        }, 1000);
      }
    }
  };

  const checkWin = (state) => {
    for (let i = 0; i < 15; i++) {
      if (state[i] !== i + 1) return false;
    }
    return state[15] === null;
  };

  const resetStats = () => {
    setMoves(0);
    stopTimer();
    setTimer('00:00');
    setStartTime(null);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  return (
    <div className="puzzle-wrapper">
      <div className="puzzle-grid">
        {puzzleState.map((value, index) => (
          <div
            key={index}
            data-index={index}
            className={`puzzle-tile ${value === null ? 'empty' : ''}`}
            onClick={() => moveTile(index)}
          >
            {value !== null && value}
          </div>
        ))}
      </div>
      
      <div className="puzzle-controls">
        <button className="puzzle-btn" onClick={shufflePuzzle}>🔀 Shuffle</button>
        <button className="puzzle-btn" onClick={resetPuzzle}>🔄 Reset</button>
        <button className="puzzle-btn" onClick={showHint}>💡 Hint</button>
      </div>

      <div className="puzzle-stats">
        <div className="puzzle-stat">
          <span className="puzzle-stat-label">Moves:</span>
          <span className="puzzle-stat-value">{moves}</span>
        </div>
        <div className="puzzle-stat">
          <span className="puzzle-stat-label">Time:</span>
          <span className="puzzle-stat-value">{timer}</span>
        </div>
      </div>
    </div>
  );
}