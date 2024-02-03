import React, { useState } from 'react';

function Gptcode() {
  const rows = 4;
  const cols = 4;
  const [board, setBoard] = useState(() => initializeBoard());

  function initializeBoard() {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  console.log(board);

  // Add random num
  function addRandom() {
    const emptyCells = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!board[i][j]) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }

    if (emptyCells.length > 0) {
      const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[row][col] = Math.random() < 0.9 ? 2 : 4; // 90% chance for 2, 10% chance for 4
        return newBoard;
      });
    } else {
      console.log('Game Over');
      // Handle game-over logic here
    }
  }

  // Move and combine
  function moveAndCombine(matrix, direction) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Helper function to move and combine elements in a row
    const moveAndCombineRow = (row) => {
      // Move all non-null values based on the direction
      let movedRow;
      switch (direction) {
        case 'left':
          movedRow = row.filter((value) => value !== 0);
          while (movedRow.length < cols) {
            movedRow.unshift(0);
          }
          break;
        case 'right':
          movedRow = row.filter((value) => value !== 0);
          while (movedRow.length < cols) {
            movedRow.push(0);
          }
          break;
        // Handle 'up' and 'down' similarly
        default:
          movedRow = [...row];
      }

      // Combine adjacent identical values
      for (let i = cols - 1; i > 0; i--) {
        if (movedRow[i] === movedRow[i - 1]) {
          movedRow[i] *= 2;
          movedRow[i - 1] = 0;
        }
      }

      // Move again to fill in gaps created by combining
      const finalRow = movedRow.filter((value) => value !== 0);
      while (finalRow.length < cols) {
        finalRow.push(0);
      }

      return finalRow;
    };

    // Transform each row in the matrix based on the direction
    const transformedMatrix =
      direction === 'up'
        ? matrix[0].map((_, colIndex) => moveAndCombineRow(matrix.map((row) => row[colIndex])))
        : direction === 'down'
        ? matrix[0].map((_, colIndex) => moveAndCombineRow(matrix.map((row) => row[colIndex]).reverse())).reverse()
        : matrix.map((row) => moveAndCombineRow(row));

    return transformedMatrix;
  }

  function handleMove(direction) {
    const newBoard = moveAndCombine(board, direction);
    setBoard(newBoard);
    addRandom();
  }

  return (
    <>
      <div className='bg-slate-600 grid grid-cols-4 gap-4 rounded-md p-2'>
        {board.map((row, rowIndex) => (
          row.map((col, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className='w-16 h-16 text-black bg-white rounded-md text-center '>
              {col > 0 ? col || '' : ''}
            </div>
          ))
        ))}
      </div>
      <div className='flex flex-col w-["40px] mt-6'>
        <div className='flex justify-center'>
          <button onClick={() => handleMove('up')}>T</button>
        </div>
        <div className='flex justify-between'>
          <button onClick={() => handleMove('left')}>L</button>
          <button onClick={() => handleMove('right')}>R</button>
        </div>
        <div className='flex justify-center'>
          <button onClick={() => handleMove('down')}>B</button>
        </div>
      </div>
    </>
  );
}

export default Gptcode;
