import React from "react";
import { useEffect, useState } from "react";

import Button from "../../components/BasicComponents/Button/Button";

import styles from "../../styles/components/BestComment/BestComment.module.scss";

import axios from "axios";

const SERVER_URL = "http://127.0.0.1:8000";

const BestComment = ({ majorId }) => {
    const [bestComment, setBestComment] = useState({});

    useEffect(() => {
        const kierunek_id = majorId;

        axios
            .post(`${SERVER_URL}/api/best_opinia/`, {
                kierunek_id: kierunek_id,
            })
            .then((response) => {
                console.log(response.data);
                setBestComment(response.data);
            })
            .catch((error) => {
                console.error(
                    error
                );
            });
    }, []);
    
    return (
        <div className={styles.container}>
            <div className={styles.userSegment}>
                <div className={styles.userImage}>
                    <p className={styles.userFirstLetter}>
                        {bestComment.user && bestComment.user[0].toUpperCase()}
                    </p>
                </div>
                <p className={styles.username}>{bestComment.user}:</p>
            </div>
            <div className={styles.commentSegment}>{bestComment.text}</div>
            <div className={styles.moreSegment}>
                <Button buttonType="contained" buttonSize="medium">
                    więcej
                </Button>
            </div>
        </div>
    );
};

export default BestComment;
