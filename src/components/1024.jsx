import { Button, Image } from '@nextui-org/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chambian from './Chambian';
import Loss from './Loss';

function Game() {
    const rows = 4;
    const cols = 4;
    const [board, setBoard] = useState(() => addRandom(addRandom(initializeBoard())));
    const [move, setMove] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [shoWin, setShoWin] = useState(false);

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
                if (board[i][j] == 8 && shoWin === false) {
                    setShoWin('yes')
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
        if (shoWin===true) setMove(null);

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
        if (gameOver==true) return;
        if (shoWin==true) return;
        if (!move) return;

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
                    return prevBoard;
            }
            return addRandom(newBoard, move);
        });

        setMove(null);
    }, [move]);

    const resetGame = () => {
        setBoard(() => addRandom(addRandom(initializeBoard())));
        setGameOver(false);
    };

    const getColor = (number) => {
        switch (number) {
            case 2: return '#FFF3E0'; // light orange
            case 4: return '#FFE0B2';
            case 8: return '#FFCC80';
            case 16: return '#FFB74D';
            case 32: return '#FFA726';
            case 64: return '#FF9800';
            case 128: return '#FB8C00';
            case 256: return '#F57C00';
            case 512: return '#EF6C00';
            case 1024: return '#E65100';
            case 2048: return '#DD2C00'; // dark orange
            default: return '#FFFFFF'; // white for empty cells
        }
    };

    const motionVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 }
    };

    return (
        <>
            {shoWin ? (
                <Chambian setShoWin={() => setShoWin()} />
            ) : (
                <>
                    {gameOver ? (
                        <Loss resetGame={() => resetGame()} />
                    ) : (<>
                        <div className='bg-gray-500 grid grid-cols-4 gap-2 rounded-md p-2'>
                            {board.map((row, rowIndex) => (
                                row.map((col, colIndex) => (
                                    <AnimatePresence key={`${rowIndex}-${colIndex}`}>
                                        <motion.div
                                            key={`${rowIndex}-${colIndex}`}
                                            className='py-4 w-16 h-16 text-black rounded-md'
                                            style={{ backgroundColor: getColor(col) }}
                                            variants={motionVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span className='text-2xl'>{col > 0 ? col || '' : ''}</span>
                                        </motion.div>
                                    </AnimatePresence>
                                ))
                            ))}
                        </div>
                        <div className='flex flex-col w-["40px] mt-6'>
                            <div className='flex justify-center'>
                                <Button variant='ghost' className='bg-gray-500' color='' onClick={() => setMove('up')} >
                                    <ArrowUp />
                                </Button>
                            </div>
                            <div className='flex justify-between'>
                                <Button variant='ghost' className='bg-gray-500' color='' onClick={() => setMove('left')} >
                                    <ArrowLeft />
                                </Button>
                                <Button variant='ghost' className='bg-gray-500' color='' onClick={() => setMove('right')} >
                                    <ArrowRight />
                                </Button>
                            </div>
                            <div className='flex justify-center'>
                                <Button variant='ghost' className='bg-gray-500' color='' onClick={() => setMove('down')} >
                                    <ArrowDown />
                                </Button>
                            </div>
                        </div>
                    </>)}
                </>
            )}
        </>
    );
}

export default Game;