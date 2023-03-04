import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(1);

  useEffect(() => {
    socket.on('move', data => {
      setBoard(data.board);
      setPlayer(data.player);
    });

    return () => {
      socket.off('move');
    };
  }, []);

  const handleClick = index => {
    const newBoard = [...board];
    newBoard[index] = player === 1 ? 'X' : 'O';
    setBoard(newBoard);

    const newPlayer = player === 1 ? 2 : 1;
    setPlayer(newPlayer);

    socket.emit('move', {
      board: newBoard,
      player: newPlayer
    });
  };

  return (
    <div>
      {board.map((cell, index) => (
        <button key={index} onClick={() => handleClick(index)}>{cell}</button>
      ))}
    </div>
  );
};

export default Game;