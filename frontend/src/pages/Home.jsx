import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import OverallTop5 from "../components/OverallTop5/OverallTop5";
import Quiz from "./Quiz";

import styles from "../styles/pages/Home.module.scss";

const Home = () => {
    const [flag, setFlag] = useState("home");
    const location = useLocation();
    const navigate = useNavigate();
    const [currentFold, setCurrentFold] = useState(
        location.pathname.split("/").pop()
    );

    useEffect(() => {
        navigate(`/${currentFold}`);
    }, [currentFold]);

    const handleQuizActivation = () => {
        setCurrentFold("quiz");
    };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.main}>
                <div className={styles.textMain}>
                    <p className={styles.largeText}>
                        Wyszukaj swoją <br />
                        przyszłą uczelnię na <br />
                        podstawie{" "}
                        <span className={styles.textGradient1}> Twojej </span>
                        wizji <br />
                        <span className={styles.textGradient2}> siebie </span>
                    </p>
                </div>
                <div className={styles.buttonMain}>
                    <button
                        className={styles.quizButton}
                        onClick={handleQuizActivation}
                    >
                        pozwól nam poznać Twoje preferencje
                    </button>
                </div>
            </div>
            <div className={styles.topMajors}>
                <p className={styles.topMajorsText}>
                    Najlepsze kierunki informatyczne:
                </p>
                <OverallTop5 flag={flag} />
            </div>
        </div>
    );
};

export default Home;
