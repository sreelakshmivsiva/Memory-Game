import React from 'react';
import { useGameState } from '../hooks/useGameState';
import Card from './Card';

const MemoryGame = () => {
  const { cards, moves, matches, handleCardClick, restartGame } = useGameState();

  return (
    <div className="memory-game">
      <h1 className="text-center text-3xl font-bold">Memory Game</h1>
      <div className="game-info text-center my-4">
        <p>Moves: {moves}</p>
        <span> Matches: {matches} </span>
        {matches === 8 && <p>🎉 You win! 🎉</p>}
      </div>
      <button
        className="restart-btn bg-gray-700 text-white px-4 py-2 rounded"
        onClick={restartGame}
      >
        Restart Game
      </button>
      <div className="grid grid-cols-4 gap-4 mt-6">
        {cards.map((card, i) => (
          <Card
            key={i}
            value={card.value}
            isFlipped={card.isFlipped || card.isMatched}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;