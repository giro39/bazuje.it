import { useState } from "react";
import styles from "../../styles/components/Opinion/Opinion.module.scss";

import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const Rating = ({ rating }) => {
    const [currentRating, setCurrentRating] = useState(rating);

    const downVoted = rating - 1;
    const upVoted = rating + 1;

    function handleVote(type) {
        if (type === "up") {
            setCurrentRating(() => rating + 1);
        } else {
            setCurrentRating(() => rating - 1);
        }
    }

    return (
        <div className={styles.ratingContainer}>
            <button
                className={styles.ratingButton}
                onClick={() => handleVote("up")}
            >
                <FaArrowUp className={styles.arrowUp} />
            </button>
            <p className={styles.rating}>{currentRating}</p>
            <button
                className={styles.ratingButton}
                onClick={() => handleVote("down")}
            >
                <FaArrowDown className={styles.arrowDown} />
            </button>
        </div>
    );
};

export default Rating;
