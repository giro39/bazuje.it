import { useState } from "react";
import styles from "../../styles/components/Opinion/Opinion.module.scss";

import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const Rating = ({ rating }) => {
    const [currentRating, setCurrentRating] = useState(rating);
    const [isVoted, setIsVoted] = useState(null);

    function handleVote(type) {
        if (type === isVoted) {
            setCurrentRating(() => rating);
            setIsVoted(null);
        } else {
            setIsVoted(type);
            type === "up"
                ? setCurrentRating(() => rating + 1)
                : setCurrentRating(() => rating - 1);
        }
    }

    return (
        <div className={styles.ratingContainer}>
            <button
                className={styles.ratingButton}
                onClick={() => handleVote("up")}
            >
                <FaArrowUp className={`${isVoted === "up" && styles.active}`} />
            </button>
            <p className={styles.rating}>{currentRating}</p>
            <button
                className={styles.ratingButton}
                onClick={() => handleVote("down")}
            >
                <FaArrowDown
                    className={`${isVoted === "down" && styles.active}`}
                />
            </button>
        </div>
    );
};

export default Rating;
