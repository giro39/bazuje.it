import { useEffect, useState, useContext } from "react";
import styles from "../../styles/components/Opinion/Opinion.module.scss";
import Button from "../BasicComponents/Button/Button";
import Rating from "./Rating";
import UserTag from "./UserTag";

import { ThemeContext } from "../../contexts/ThemeContext";
import { LoggedUsernameContext } from "../../contexts/LoggedUsernameContext";

const Opinion = ({ text, rating, user, opinionId, loggedUserRating }) => {
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

    const changeContainer = () => {
        setIsContained((prevState) => !prevState);
    };

    return (
        <div className={`${styles.container}`}>
            <div className={styles.userModule}>
                <UserTag user={user} />
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
