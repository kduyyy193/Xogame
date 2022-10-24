import "./Square.scss";
import { motion } from "framer-motion";

const Square = ({ idx, updateSquares, className }) => {
    const handleClick = () => {
        updateSquares(idx);
    };
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="square"
            onClick={handleClick}
        >
            {className && (
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={className}
                ></motion.span>
            )}
        </motion.div>
    );
};

export default Square;
