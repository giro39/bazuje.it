import { useState } from "react";
import styles from "../../styles/components/Opinion/Opinion.module.scss";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const SERVER_URL = "http://127.0.0.1:8000";

const Rating = ({ rating, opinionId }) => {
    const [currentRating, setCurrentRating] = useState(rating);
    const [isVoted, setIsVoted] = useState(0);

    function handleVote(vote) {
        if (vote === isVoted) {
            setCurrentRating(() => rating);
            setIsVoted(0);
        } else {
            setIsVoted(vote);
            vote === 1
                ? setCurrentRating(() => rating + 1)
                : setCurrentRating(() => rating - 1);
        }
        postVote();
    }

    0
    const postVote = () => {
        const token = localStorage.getItem("access");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;
            console.log(userId, opinionId, isVoted);
            axios
                .post(`${SERVER_URL}/api/vote/`, {
                    userId: userId,
                    opinionId: opinionId,
                    grade: isVoted,

                })
                .then((response) => {
                    console.log(response.message);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };


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
                <FaArrowDown
                    className={`${isVoted === -1 && styles.active}`}
                />
            </button>
        </div>
    );
};

export default Rating;
