import React, { useState, useEffect } from "react";
import { Trophy, LogIn, UserPlus, LogOut, Crown, Medal } from 'lucide-react';

const API = "http://localhost:4000";

export default function PuzzleGame() {
  const [puzzleState, setPuzzleState] = useState([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState("00:00");
  const [timerInterval, setTimerInterval] = useState(null);

  // Auth + Scores
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ username: "", password: "" });
  const [showLeaderboard, setShowLeaderboard] = useState(false);

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
        const m = String(Math.floor(elapsed / 60)).padStart(2, "0");
        const s = String(elapsed % 60).padStart(2, "0");
        setTimer(`${m}:${s}`);
      }, 1000);
      setTimerInterval(interval);
    }
  }, [startTime, timerInterval]);

  const initPuzzle = () => {
    const arr = Array.from({ length: 15 }, (_, i) => i + 1);
    arr.push(null);
    setPuzzleState(arr);
  };

  const getValidMoves = (empty) => {
    const row = Math.floor(empty / 4);
    const col = empty % 4;
    const moves = [];

    if (row > 0) moves.push(empty - 4);
    if (row < 3) moves.push(empty + 4);
    if (col > 0) moves.push(empty - 1);
    if (col < 3) moves.push(empty + 1);

    return moves;
  };

  const moveTile = (idx) => {
    const emptyIdx = puzzleState.indexOf(null);
    const canMove = getValidMoves(emptyIdx);

    if (!canMove.includes(idx)) return;

    const copy = [...puzzleState];
    [copy[idx], copy[emptyIdx]] = [copy[emptyIdx], copy[idx]];

    setPuzzleState(copy);
    setMoves((m) => m + 1);

    if (!startTime) setStartTime(Date.now());
    if (checkWin(copy)) handleWin();
  };

  const shufflePuzzle = () => {
    resetStats();
    let arr = [...puzzleState];

    for (let i = 0; i < 200; i++) {
      const e = arr.indexOf(null);
      const valid = getValidMoves(e);
      const r = valid[Math.floor(Math.random() * valid.length)];
      [arr[e], arr[r]] = [arr[r], arr[e]];
    }

    setPuzzleState(arr);
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

  const checkWin = (state) =>
    state.every((v, i) => (i < 15 ? v === i + 1 : v === null));

  const resetStats = () => {
    setMoves(0);
    stopTimer();
    setTimer("00:00");
    setStartTime(null);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = authMode === "login" ? "/auth/login" : "/auth/register";

    try {
      const res = await fetch(API + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error");
        return;
      }

      if (authMode === "login") {
        setUser(data);
        loadLeaderboard();
        setAuthForm({ username: "", password: "" });
      } else {
        alert("Registration successful! Please log in.");
        setAuthMode("login");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const loadLeaderboard = async () => {
    try {
      const res = await fetch(API + "/scores/top");
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('Failed to load leaderboard');
    }
  };

  const saveScore = async () => {
    if (!user) return;

    try {
      await fetch(API + "/scores/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          moves,
          time: timer,
        }),
      });

      loadLeaderboard();
    } catch (err) {
      console.error('Failed to save score');
    }
  };

  const handleWin = () => {
    stopTimer();
    setTimeout(() => {
      alert("🎉 YOU WON!");
      if (user) saveScore();
    }, 300);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthForm({ username: "", password: "" });
  };

  return (
    <div className="puzzle-wrapper">
      {/* Auth Overlay */}
      {!user && (
        <div className="puzzle-auth-overlay">
          <div className="puzzle-auth-card">
            <div className="auth-header">
              <div className="auth-icon">
                {authMode === 'login' ? <LogIn size={32} /> : <UserPlus size={32} />}
              </div>
              <h3>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
              <p>Track your scores and compete on the leaderboard!</p>
            </div>

            <form onSubmit={handleAuth} className="auth-form">
              <div className="auth-input-group">
                <input
                  type="text"
                  placeholder="Username"
                  value={authForm.username}
                  onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                  required
                  className="auth-input"
                />
              </div>

              <div className="auth-input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  required
                  className="auth-input"
                />
              </div>

              <button type="submit" className="auth-submit-btn">
                {authMode === 'login' ? (
                  <>
                    <LogIn size={18} />
                    Log In
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    Sign Up
                  </>
                )}
              </button>

              <button
                type="button"
                className="auth-switch-btn"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              >
                {authMode === 'login' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Log in"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Game Content */}
      {user && (
        <>
          {/* User Bar */}
          <div className="puzzle-user-bar">
            <div className="user-info-section">
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <span className="user-name">{user.username}</span>
                <span className="user-status">🎮 Playing</span>
              </div>
            </div>
            <div className="user-actions">
              <button 
                className="leaderboard-btn" 
                onClick={() => setShowLeaderboard(!showLeaderboard)}
              >
                <Trophy size={18} />
                {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* Leaderboard Panel */}
          {showLeaderboard && (
            <div className="leaderboard-panel">
              <div className="leaderboard-header">
                <Crown size={24} />
                <h3>Top Players</h3>
              </div>
              <div className="leaderboard-list">
                {leaderboard.length > 0 ? (
                  leaderboard.map((score, index) => (
                    <div key={index} className={`leaderboard-item ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
                      <div className="rank">
                        {index === 0 && <Medal size={20} style={{ color: '#FFD700' }} />}
                        {index === 1 && <Medal size={20} style={{ color: '#C0C0C0' }} />}
                        {index === 2 && <Medal size={20} style={{ color: '#CD7F32' }} />}
                        {index > 2 && <span className="rank-number">#{index + 1}</span>}
                      </div>
                      <div className="player-name">{score.username}</div>
                      <div className="player-stats">
                        <span className="stat-moves">{score.moves} moves</span>
                        <span className="stat-time">{score.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-scores">No scores yet. Be the first!</p>
                )}
              </div>
            </div>
          )}

          {/* Puzzle Grid */}
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
        </>
      )}
    </div>
  );
}