import React from "react";
import { useEffect, useState } from "react";

import Button from "../../components/BasicComponents/Button/Button";

import styles from "../../styles/components/BestComment/BestComment.module.scss";

import axios from "axios";

const SERVER_URL = "http://127.0.0.1:8000";

const BestComment = () => {
    const [bestComment, setBestComment] = useState([]);

    useEffect(() => {
        const kierunek_id = 150; //hardcoded narazie

        axios
            .post(`${SERVER_URL}/api/best_opinia/`, {
                kierunek_id: kierunek_id,
            })
            .then((response) => {
                console.log(response.data);
                //setBestComment(response.data.bestComment); //nwm co to jest kopilot to pisal :D
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the username!",
                    error
                );
            });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.userSegment}>
                <div className={styles.userImage}>
                    <p className={styles.userFirstLetter}>M</p>
                </div>
                <p className={styles.username}>Marco:</p>
            </div>
            <div className={styles.commentSegment}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
                praesentium enim hic deleniti, itaque ea vero a magni ex fuga
                est neque qui amet voluptates atque, maxime delectus dolores
                aliquid?
            </div>
            <div className={styles.moreSegment}>
                <Button buttonType="contained" buttonSize="medium">
                    więcej
                </Button>
            </div>
        </div>
    );
};

export default BestComment;
