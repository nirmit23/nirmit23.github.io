import React, { useState } from 'react';
import TicTacToe from './TicTacToe';
import SlidingPuzzle from './SlidingPuzzle';
import './GameTabs.css';

export default function GameTabs() {
  const [activeTab, setActiveTab] = useState('puzzle');

  return (
    <div className="game-tabs-container">
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === 'puzzle' ? 'active' : ''}`}
          onClick={() => setActiveTab('puzzle')}
        >
          <span className="tab-icon">🎮</span>
          <span className="tab-text">Sliding Puzzle</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'tictactoe' ? 'active' : ''}`}
          onClick={() => setActiveTab('tictactoe')}
        >
          <span className="tab-icon">⭕</span>
          <span className="tab-text">Tic Tac Toe</span>
        </button>
      </div>

      <div className="tabs-content">
        {activeTab === 'puzzle' && (
          <div className="tab-panel">
            <div className="game-info-compact">
              <p className="game-description-compact">
                Arrange numbers 1-15 in order by sliding tiles into the empty space.
              </p>
              <div className="game-meta">
                <span className="difficulty-badge">Difficulty: Medium</span>
                <div className="tech-tags-compact">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">CSS3</span>
                  <span className="tech-tag">JavaScript</span>
                </div>
              </div>
            </div>
            <div className="game-embed">
              <SlidingPuzzle />
            </div>
          </div>
        )}

        {activeTab === 'tictactoe' && (
          <div className="tab-panel">
            <div className="game-info-compact">
              <p className="game-description-compact">
                Play against an unbeatable AI or challenge a friend in 2-player mode.
              </p>
              <div className="game-meta">
                <span className="difficulty-badge">Difficulty: Hard</span>
                <div className="tech-tags-compact">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Minimax AI</span>
                  <span className="tech-tag">JavaScript</span>
                </div>
              </div>
            </div>
            <div className="game-embed">
              <TicTacToe />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}