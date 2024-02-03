import { useEffect, useState } from 'react';

function Game() {
    const rows = 4;
    const cols = 4;
    const [board, setBoard] = useState(() => initializeBoard());
    function initializeBoard() {
        return Array.from({ length: rows }, () => Array(cols).fill(0));
    }
    console.log(board);

    // Add random num
    function addRandom() {
        const kali = []
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!board[i][j]) {
                    kali.push({ row: i, col: j });
                }
            }
        }

        if (kali.length > 0) {
            const { row, col } = kali[Math.floor(Math.random() * kali.length)];
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

    //move and combine 
    function moveAndCombine(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        // Helper function to move and combine elements in a row
        const moveAndCombineRow = (row) => {
            // Move all non-null values to the right
            const movedRow = row.filter((value) => value !== 0);
            while (movedRow.length < cols) {
                movedRow.unshift(0);
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
                finalRow.unshift(0);
            }

            return finalRow;
        };

        // Transform each row in the matrix
        const transformedMatrix = matrix.map((row) => moveAndCombineRow(row));

        return transformedMatrix;
    }

    function leftAlign(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        // Helper function to move and combine elements in a row
        const moveAndCombineRow = (row) => {
            // Move all non-null values to the left
            const movedRow = row.filter((value) => value !== 0);
            while (movedRow.length < cols) {
                movedRow.push(0);
            }

            // Combine adjacent identical values
            for (let i = 0; i < cols - 1; i++) {
                if (movedRow[i] === movedRow[i + 1]) {
                    movedRow[i] *= 2;
                    movedRow[i + 1] = 0;
                }
            }

            // Move again to fill in gaps created by combining
            const finalRow = movedRow.filter((value) => value !== 0);
            while (finalRow.length < cols) {
                finalRow.push(0);
            }

            return finalRow;
        };

        // Transform each row in the matrix
        const transformedMatrix = matrix.map((row) => moveAndCombineRow(row));

        return transformedMatrix;
    }

    function topAlign(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        // Helper function to move and combine elements in a column
        const moveAndCombineColumn = (colIndex) => {
            const column = matrix.map((row) => row[colIndex]);

            // Move all non-null values to the top
            const movedColumn = column.filter((value) => value !== 0);
            while (movedColumn.length < rows) {
                movedColumn.push(0);
            }

            // Combine adjacent identical values
            for (let i = 0; i < rows - 1; i++) {
                if (movedColumn[i] === movedColumn[i + 1]) {
                    movedColumn[i] *= 2;
                    movedColumn[i + 1] = 0;
                }
            }

            // Move again to fill in gaps created by combining
            const finalColumn = movedColumn.filter((value) => value !== 0);
            while (finalColumn.length < rows) {
                finalColumn.push(0);
            }

            // Update the original matrix with the new column values
            matrix.forEach((row, rowIndex) => {
                row[colIndex] = finalColumn[rowIndex];
            });

            return matrix;
        };

        // Transform each column in the matrix
        for (let colIndex = 0; colIndex < cols; colIndex++) {
            moveAndCombineColumn(colIndex);
        }

        return matrix;
    }

    function bottomAlign(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        // Helper function to move and combine elements in a column
        const moveAndCombineColumn = (colIndex) => {
            const column = matrix.map((row) => row[colIndex]);

            // Move all non-null values to the bottom
            const movedColumn = column.filter((value) => value !== 0);
            while (movedColumn.length < rows) {
                movedColumn.unshift(0);
            }

            // Combine adjacent identical values
            for (let i = rows - 1; i > 0; i--) {
                if (movedColumn[i] === movedColumn[i - 1]) {
                    movedColumn[i] *= 2;
                    movedColumn[i - 1] = 0;
                }
            }

            // Move again to fill in gaps created by combining
            const finalColumn = movedColumn.filter((value) => value !== 0);
            while (finalColumn.length < rows) {
                finalColumn.unshift(0);
            }

            // Update the original matrix with the new column values
            matrix.forEach((row, rowIndex) => {
                row[colIndex] = finalColumn[rowIndex];
            });

            return matrix;
        };

        // Transform each column in the matrix
        for (let colIndex = 0; colIndex < cols; colIndex++) {
            moveAndCombineColumn(colIndex);
        }

        return matrix;
    }

    function handleRightMove() {
        const newBoard = moveAndCombine(board);
        setBoard(newBoard);
        addRandom()
    }

    function handleLeftMove() {
        const newBoard = leftAlign(board);
        setBoard(newBoard);
        addRandom()
    }

    function handleTopMove() {
        const newBoard = topAlign(board);
        setBoard(newBoard);
        addRandom();
    }

    function handleBottomMove() {
        const newBoard = bottomAlign(board);
        setBoard(newBoard);
        addRandom();
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    handleTopMove();
                    break;
                case 'ArrowLeft':
                    handleLeftMove();
                    break;
                case 'ArrowRight':
                    handleRightMove();
                    break;
                case 'ArrowDown':
                    handleBottomMove();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    return (
        <>
            <div className='bg-orange-200 grid grid-cols-4 gap-4 rounded-md p-2'>
                {board.map((row, rowIndex) => (
                    row.map((col, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className='py-4 w-16 h-16 text-black bg-white rounded-md'>
                            <span className='text-2xl'>{col > 0 ? col || '' : ''}</span>
                        </div>
                    ))
                ))}
            </div>
            <div className='flex flex-col w-["40px] mt-6'>
                <div className='flex justify-center'>
                    <button onClick={() => handleTopMove()} >T</button>
                </div>
                <div className='flex justify-between'>
                    <button onClick={() => handleLeftMove()} >L</button>
                    <button onClick={() => handleRightMove()} >R</button>
                </div>
                <div className='flex justify-center'>
                    <button onClick={() => handleBottomMove()} >B</button>
                </div>
            </div>
        </>
    );
}

export default Game;