import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import styles from "../../styles/components/Opinion/Opinion.module.scss";

import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const SERVER_URL = "http://127.0.0.1:8000";

const Rating = ({ rating, opinionId, loggedUserRating }) => {
    const [currentRating, setCurrentRating] = useState(rating);
    const [isVoted, setIsVoted] = useState(loggedUserRating);

    const neutralRating =
        loggedUserRating === 0 ? rating : rating - loggedUserRating;

    const postVote = (vote) => {
        const token = localStorage.getItem("access");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;
            axios
                .post(`${SERVER_URL}/api/vote/`, {
                    userId: userId,
                    opinionId: opinionId,
                    grade: vote,
                })

                .catch((error) => {
                    console.error(error);
                });
        }
    };

    function handleVote(vote) {
        if (vote === isVoted) {
            setCurrentRating(neutralRating);

            setIsVoted(0);
            postVote(neutralRating);
        } else {
            setIsVoted(vote);
            vote === 1
                ? setCurrentRating(neutralRating + 1)
                : setCurrentRating(neutralRating - 1);
            postVote(vote);
        }
    }

    return (
        <div className={styles.ratingContainer}>
            <button
                className={styles.ratingButton}
                onClick={() => handleVote(1)}
            >
                <FaArrowUp className={`${isVoted === 1 && styles.active}`} />
            </button>
            <p className={styles.rating}>{currentRating}</p>
            <button
                className={styles.ratingButton}
                onClick={() => handleVote(-1)}
            >
                <FaArrowDown className={`${isVoted === -1 && styles.active}`} />
            </button>
        </div>
    );
};

export default Rating;
