import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "../components/Button";
import Square from "../components/Square";


const For2Players = () => {
    let items = Array(9).fill("")
    const [squares, setSquares] = useState(items);
    const [turn, setTurn] = useState("x");
    const [winner, setWinner] = useState(null);

    const checkEndTheGame = () => {
        for (let square of squares) {
            if (!square) return false;
        }
        return true;
    };

    const checkWinner = () => {
        const combos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combo of combos) {
            const [a, b, c] = combo;
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        return null;
    };

    const updateSquares = (idx) => {
        if (winner) {
            return;
        }
        const s = squares;
        s[idx] = turn;
        setSquares(s);
        setTurn(turn === "x" ? "o" : "x");
        const W = checkWinner();
        if (W) {
            setWinner(W);
        } else if (checkEndTheGame()) {
            setWinner("x | o");
        }
    };

    const resetGame = () => {
        setSquares(items);
        setTurn("x");
        setWinner(null);
    }

    return (
        <div className="container">
            <h1> OX For 2 Players </h1>
            <Button resetGame={resetGame}>New Game</Button>
            <div className="game">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                    <Square
                        key={idx}
                        idx={idx}
                        updateSquares={updateSquares}
                        className={squares[idx]}
                    />
                ))}
            </div>
            <div className={`turn ${turn === "x" ? "left" : "right"}`}>
                <Square className="x" />
                <Square className="o" />
            </div>
            <AnimatePresence>
                {winner && (
                    <motion.div
                        key={"parent-box"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="winner"
                    >
                        <motion.div
                            key={"child-box"}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="text"
                        >
                            <motion.h2
                                initial={{ scale: 0, y: 100 }}
                                animate={{
                                    scale: 1,
                                    y: 0,
                                    transition: {
                                        y: { delay: 0.7 },
                                        duration: 0.7,
                                    },
                                }}
                            >
                                {winner === "x | o"
                                    ? "No Winner 😐"
                                    : "Win !! 😝"}
                            </motion.h2>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{
                                    scale: 1,
                                    transition: {
                                        delay: 1.3,
                                        duration: 0.2,
                                    },
                                }}
                                className="win"
                            >
                                {winner === "x | o" ? (
                                    <>
                                        <Square className="x" />
                                        <Square className="o" />
                                    </>
                                ) : (
                                    <>
                                        <Square className={winner} />
                                    </>
                                )}
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{
                                    scale: 1,
                                    transition: { delay: 1.5, duration: 0.3 },
                                }}
                            >
                                <Button resetGame={resetGame}>New Game</Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

}

export default For2Players