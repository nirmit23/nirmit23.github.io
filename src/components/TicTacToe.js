import React, { useState, useEffect } from 'react';
import { X, Circle, RotateCcw, Trophy, ChevronDown } from 'lucide-react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [gameMode, setGameMode] = useState('computer');
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (currentBoard) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: pattern };
      }
    }
    if (currentBoard.every(cell => cell !== null)) {
      return { winner: 'draw', line: [] };
    }
    return null;
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const result = checkWinner(currentBoard);
    
    if (result) {
      if (result.winner === 'O') return 10 - depth;
      if (result.winner === 'X') return depth - 10;
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'O';
          let score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'X';
          let score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (currentBoard) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O';
        let score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  useEffect(() => {
    if (gameMode === 'computer' && !isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove([...board]);
        if (bestMove !== null) {
          handleMove(bestMove, 'O');
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameOver, gameMode]);

  const handleMove = (index, player) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setGameOver(true);
      
      if (result.winner === 'X') {
        setScores(prev => ({ ...prev, player1: prev.player1 + 1 }));
      } else if (result.winner === 'O') {
        setScores(prev => ({ ...prev, player2: prev.player2 + 1 }));
      } else {
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      }
    } else {
      if (gameMode === 'player') {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
      setIsPlayerTurn(!isPlayerTurn);
    }
  };

  const handlePlayerMove = (index) => {
    if (gameMode === 'computer') {
      if (isPlayerTurn && !gameOver) {
        handleMove(index, 'X');
      }
    } else if (gameMode === 'player') {
      if (!gameOver) {
        handleMove(index, currentPlayer);
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine([]);
    setGameOver(false);
  };

  const resetScores = () => {
    setScores({ player1: 0, player2: 0, draws: 0 });
    resetGame();
  };

  const changeGameMode = (mode) => {
    setGameMode(mode);
    setScores({ player1: 0, player2: 0, draws: 0 });
    resetGame();
    setIsDropdownOpen(false);
  };

  return (
    <div className="tictactoe-wrapper">
      <div className="tictactoe-container">
        {/* Header */}
        <div className="tictactoe-header">
          <h3 className="tictactoe-title">Tic Tac Toe</h3>
          
          {/* Game Mode Dropdown */}
          <div className="tictactoe-dropdown">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="dropdown-trigger"
            >
              <span className="dropdown-text">
                {gameMode === 'computer' ? '🤖 vs Computer' : '👥 2 Players'}
              </span>
              <ChevronDown 
                className="dropdown-icon" 
                style={{ 
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }} 
              />
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  onClick={() => changeGameMode('computer')}
                  className={`dropdown-item ${gameMode === 'computer' ? 'active' : ''}`}
                >
                  <span>🤖</span>
                  <div>
                    <div className="item-title">vs Computer</div>
                    <div className="item-subtitle">Challenge the AI</div>
                  </div>
                </button>
                
                <button
                  onClick={() => changeGameMode('player')}
                  className={`dropdown-item ${gameMode === 'player' ? 'active' : ''}`}
                >
                  <span>👥</span>
                  <div>
                    <div className="item-title">2 Players</div>
                    <div className="item-subtitle">Play with a friend</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scores */}
        <div className="tictactoe-scores">
          <div className="score-card">
            <div className="score-label player1">
              {gameMode === 'computer' ? 'You' : 'Player 1'}
            </div>
            <div className="score-value">{scores.player1}</div>
          </div>
          <div className="score-card">
            <div className="score-label draws">Draws</div>
            <div className="score-value">{scores.draws}</div>
          </div>
          <div className="score-card">
            <div className="score-label player2">
              {gameMode === 'computer' ? 'Computer' : 'Player 2'}
            </div>
            <div className="score-value">{scores.player2}</div>
          </div>
        </div>

        {/* Status */}
        <div className="tictactoe-status">
          {!gameOver ? (
            <p>
              {gameMode === 'computer' 
                ? (isPlayerTurn ? "Your turn (X)" : "Computer thinking...")
                : `${currentPlayer === 'X' ? 'Player 1' : 'Player 2'}'s turn (${currentPlayer})`
              }
            </p>
          ) : (
            <div className="status-winner">
              {winner === 'draw' ? (
                <p>It's a draw!</p>
              ) : (
                <>
                  <Trophy className="trophy-icon" style={{ color: winner === 'X' ? '#5B9BD5' : '#e74c3c' }} />
                  <p>
                    {gameMode === 'computer' 
                      ? (winner === 'X' ? 'You win!' : 'Computer wins!')
                      : `${winner === 'X' ? 'Player 1' : 'Player 2'} wins!`
                    }
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Game Board */}
        <div className="tictactoe-board">
          <div className="board-grid">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handlePlayerMove(index)}
                disabled={
                  (gameMode === 'computer' && (!isPlayerTurn || gameOver || cell !== null)) ||
                  (gameMode === 'player' && (gameOver || cell !== null))
                }
                className={`board-cell ${winningLine.includes(index) ? 'winning' : ''} ${cell ? 'filled' : ''}`}
              >
                {cell === 'X' && <X className="cell-icon x-icon" />}
                {cell === 'O' && <Circle className="cell-icon o-icon" />}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="tictactoe-actions">
          <button onClick={resetGame} className="action-btn primary">
            <RotateCcw className="btn-icon" />
            New Game
          </button>
          <button onClick={resetScores} className="action-btn secondary">
            Reset
          </button>
        </div>

        {/* Footer */}
        <div className="tictactoe-footer">
          <p>{gameMode === 'computer' ? 'Can you beat the AI?' : 'May the best player win!'}</p>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-overlay" onClick={() => setIsDropdownOpen(false)} />
      )}
    </div>
  );
}