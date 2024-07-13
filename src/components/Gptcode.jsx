import { Button, Switch } from '@nextui-org/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Gamepad2, Music, VolumeX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import Chambian from './Chambian';
import Loss from './Loss';

function GameSample({ pad, setPad, onMusic, setOnMusic }) {
    const rows = 4;
    const cols = 4;
    const [board, setBoard] = useState(() => addRandom(addRandom(initializeBoard())));
    const [move, setMove] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [shoWin, setShoWin] = useState(false);
    const tapSound = new Audio('/path/to/tap-sound.wav'); // Make sure this path is correct

    function initializeBoard() {
        return Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    function addRandom(board, moveDirection) {
        const emptyCells = [];
        const rows = board.length;
        const cols = board[0].length;

        // Collect all empty cells
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!board[i][j]) {
                    emptyCells.push({ row: i, col: j });
                }
                if (board[i][j] === 8 && shoWin === false) {
                    setShoWin('yes');
                }
            }
        }

        // Choose a random empty cell
        if (emptyCells.length > 0) {
            const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[row][col] = Math.random() < 0.9 ? 2 : 4; // 90% chance for 2, 10% chance for 4

            // Adjust position based on move direction
            switch (moveDirection) {
                case 'up':
                    // Add new number to the bottom row
                    board[rows - 1][col] = Math.random() < 0.9 ? 2 : 4;
                    break;
                case 'down':
                    // Add new number to the top row
                    board[0][col] = Math.random() < 0.9 ? 2 : 4;
                    break;
                case 'left':
                    // Add new number to the rightmost column
                    board[row][cols - 1] = Math.random() < 0.9 ? 2 : 4;
                    break;
                case 'right':
                    // Add new number to the leftmost column
                    board[row][0] = Math.random() < 0.9 ? 2 : 4;
                    break;
                default:
                    break;
            }
        } else {
            console.log('Game Over');
            setGameOver(true);
            // Handle game-over logic here
        }

        return board;
    }

    function moveAndCombine(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        const moveAndCombineRow = (row) => {
            const movedRow = row.filter((value) => value !== 0);
            while (movedRow.length < cols) {
                movedRow.unshift(0);
            }

            for (let i = cols - 1; i > 0; i--) {
                if (movedRow[i] === movedRow[i - 1]) {
                    movedRow[i] *= 2;
                    movedRow[i - 1] = 0;
                }
            }

            const finalRow = movedRow.filter((value) => value !== 0);
            while (finalRow.length < cols) {
                finalRow.unshift(0);
            }

            return finalRow;
        };

        const transformedMatrix = matrix.map((row) => moveAndCombineRow(row));
        return transformedMatrix;
    }

    function leftAlign(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        const moveAndCombineRow = (row) => {
            const movedRow = row.filter((value) => value !== 0);
            while (movedRow.length < cols) {
                movedRow.push(0);
            }

            for (let i = 0; i < cols - 1; i++) {
                if (movedRow[i] === movedRow[i + 1]) {
                    movedRow[i] *= 2;
                    movedRow[i + 1] = 0;
                }
            }

            const finalRow = movedRow.filter((value) => value !== 0);
            while (finalRow.length < cols) {
                finalRow.push(0);
            }

            return finalRow;
        };

        const transformedMatrix = matrix.map((row) => moveAndCombineRow(row));
        return transformedMatrix;
    }

    function topAlign(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        const moveAndCombineColumn = (colIndex) => {
            const column = matrix.map((row) => row[colIndex]);

            const movedColumn = column.filter((value) => value !== 0);
            while (movedColumn.length < rows) {
                movedColumn.push(0);
            }

            for (let i = 0; i < rows - 1; i++) {
                if (movedColumn[i] === movedColumn[i + 1]) {
                    movedColumn[i] *= 2;
                    movedColumn[i + 1] = 0;
                }
            }

            const finalColumn = movedColumn.filter((value) => value !== 0);
            while (finalColumn.length < rows) {
                finalColumn.push(0);
            }

            matrix.forEach((row, rowIndex) => {
                row[colIndex] = finalColumn[rowIndex];
            });

            return matrix;
        };

        for (let colIndex = 0; colIndex < cols; colIndex++) {
            moveAndCombineColumn(colIndex);
        }

        return matrix;
    }

    function bottomAlign(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;

        const moveAndCombineColumn = (colIndex) => {
            const column = matrix.map((row) => row[colIndex]);

            const movedColumn = column.filter((value) => value !== 0);
            while (movedColumn.length < rows) {
                movedColumn.unshift(0);
            }

            for (let i = rows - 1; i > 0; i--) {
                if (movedColumn[i] === movedColumn[i - 1]) {
                    movedColumn[i] *= 2;
                    movedColumn[i - 1] = 0;
                }
            }

            const finalColumn = movedColumn.filter((value) => value !== 0);
            while (finalColumn.length < rows) {
                finalColumn.unshift(0);
            }

            matrix.forEach((row, rowIndex) => {
                row[colIndex] = finalColumn[rowIndex];
            });

            return matrix;
        };

        for (let colIndex = 0; colIndex < cols; colIndex++) {
            moveAndCombineColumn(colIndex);
        }

        return matrix;
    }

    useEffect(() => {
        if (gameOver) setMove(null);
        if (shoWin === true) setMove(null);

        const handleKeyPress = (event) => {
            event.preventDefault();
            switch (event.key) {
                case 'ArrowUp':
                    setMove('up');
                    break;
                case 'ArrowLeft':
                    setMove('left');
                    break;
                case 'ArrowRight':
                    setMove('right');
                    break;
                case 'ArrowDown':
                    setMove('down');
                    break;
                default:
                    return;
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }

    }, []);

    useEffect(() => {
        if (gameOver === true) return;
        if (shoWin === true) return;
        if (!move) return;

        tapSound.play();

        setBoard((prevBoard) => {
            let newBoard;
            switch (move) {
                case 'up':
                    newBoard = topAlign([...prevBoard.map(row => [...row])]);
                    break;
                case 'left':
                    newBoard = leftAlign([...prevBoard.map(row => [...row])]);
                    break;
                case 'right':
                    newBoard = moveAndCombine([...prevBoard.map(row => [...row])]);
                    break;
                case 'down':
                    newBoard = bottomAlign([...prevBoard.map(row => [...row])]);
                    break;
                default:
                    newBoard = prevBoard;
            }
            return addRandom(newBoard, move);
        });
        setMove(null);
    }, [move]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => setMove('left'),
        onSwipedRight: () => setMove('right'),
        onSwipedUp: () => setMove('up'),
        onSwipedDown: () => setMove('down'),
    });

    function resetGame() {
        setBoard(() => addRandom(addRandom(initializeBoard())));
        setMove(null);
        setGameOver(false);
        setShoWin(false);
    }

    return (
        <div {...swipeHandlers} className="grid place-items-center h-full bg-black">
            {shoWin === 'yes' ? (
                <Chambian />
            ) : gameOver === true ? (
                <Loss reset={resetGame} />
            ) : (
                <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                    <div className="grid grid-cols-4 gap-3">
                        {board.flat().map((value, index) => (
                            <motion.div
                                key={index}
                                className={`flex items-center justify-center aspect-square w-[4rem] md:w-[6rem] text-xl md:text-4xl font-bold rounded-md ${value === 0
                                    ? 'bg-transparent'
                                    : 'bg-yellow-400 text-yellow-900'
                                    }`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                {value !== 0 && value}
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <Button auto onClick={() => setPad(true)}>
                            <Gamepad2 />
                        </Button>
                        <Button auto onClick={() => setOnMusic(!onMusic)}>
                            {onMusic ? <VolumeX /> : <Music />}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GameSample;
