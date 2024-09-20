import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "../../styles/components/Opinion/Opinion.module.scss";
import Button from "../BasicComponents/Button/Button";
import Grade from "./Grade";
import Rating from "./Rating";
import UserTag from "./UserTag";

import { ThemeContext } from "../../contexts/ThemeContext";
import { LoggedUsernameContext } from "../../contexts/LoggedUsernameContext";

const SERVER_URL = "http://127.0.0.1:8000";

const Opinion = ({
    text,
    rating,
    grade,
    user,
    opinionId,
    loggedUserRating,
    onDelete,
    onEdit,
}) => {
    const [isLarge, setIsLarge] = useState(false);
    const [isContained, setIsContained] = useState(true);
    const { theme } = useContext(ThemeContext);
    const { loggedUsername } = useContext(LoggedUsernameContext);

    const maxSizeOfText = 750;
    const fullTxt = text;

    const croppedTxt = fullTxt.slice(0, maxSizeOfText) + "...";

    useEffect(() => {
        if (fullTxt.length > maxSizeOfText) {
            setIsLarge(true);
        }
    }, [fullTxt]);

    const deleteOpinion = () => {
        axios
            .delete(`${SERVER_URL}/api/usun_opinie/${opinionId}`)
            .then(() => {
                if (onDelete) {
                    onDelete(opinionId);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const changeContainer = () => {
        setIsContained((prevState) => !prevState);
    };

    return (
        <div className={`${styles.container}`}>
            <div className={styles.userModule}>
                <UserTag user={user} />
                <Grade opinionId={opinionId} userGrade={grade} />
                {loggedUsername === user && (
                    <div className={styles.utilIcons}>
                        <img
                            src={
                                theme === "dark"
                                    ? "/bin_white.png"
                                    : "/bin_black.png"
                            }
                            alt="Delete opinion"
                            className={styles.utilIcon}
                            onClick={deleteOpinion}
                        />
                        <img
                            src={
                                theme === "dark"
                                    ? "/edit_white.png"
                                    : "/edit_black.png"
                            }
                            alt="Edit opinion"
                            className={styles.utilIcon}
                            style={{ transform: "scale(1.25)" }}
                            onClick={onEdit}
                        />
                    </div>
                )}
            </div>
            <div>
                <div className={styles.opinionText}>
                    {isLarge ? (isContained ? croppedTxt : fullTxt) : fullTxt}
                </div>
                {isLarge && (
                    <div className={styles.buttonPlace}>
                        <Button
                            onClick={changeContainer}
                            buttonType={"inlined"}
                            buttonSize={"inlineSize"}
                        >
                            {isContained ? "czytaj więcej" : "czytaj mniej"}
                        </Button>
                    </div>
                )}
            </div>
            <Rating
                rating={rating}
                opinionId={opinionId}
                loggedUserRating={loggedUserRating}
            />
        </div>
    );
};

export default Opinion;
