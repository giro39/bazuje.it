import React, { useEffect, useState } from "react";

import Button from "../../components/BasicComponents/Button/Button";

import styles from "../../styles/components/BestComment/BestComment.module.scss";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserProfileIcon from "../UserProfileIcon/UserProfileIcon";

const SERVER_URL = "http://127.0.0.1:8000";

const BestComment = ({ majorId }) => {
    const [bestComment, setBestComment] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const kierunek_id = majorId;

        axios
            .post(`${SERVER_URL}/api/best_opinia/`, {
                inputData: kierunek_id,
            })
            .then((response) => {
                console.log(response.data);
                setBestComment(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [majorId]);

    return (
        <div className={styles.container}>
            {bestComment.exists ? (
                <div className={styles.comment}>
                    <div className={styles.userSegment}>
                        <UserProfileIcon user={bestComment.user} />

                        <p className={styles.username}>{bestComment.user}:</p>
                    </div>
                    <div className={styles.commentSegment}>
                        {bestComment.text}
                    </div>
                    <div className={styles.moreSegment}>
                        <Button
                            buttonType="contained"
                            buttonSize="medium"
                            onClick={() => navigate(`./opinions`)}
                        >
                            więcej
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={styles.comment}>
                    <p className={styles.noComment}>
                        Kierunek nie ma jeszcze żadnej opinii
                    </p>
                </div>
            )}
        </div>
    );
};

export default BestComment;
