import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import OverallTop5 from "../components/OverallTop5/OverallTop5";
import GetUser from "../components/GetUser/GetUser";

import Button from "../components/BasicComponents/Button/Button";
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
                    <Button
                        buttonType="contained"
                        buttonSize="giant"
                        onClick={handleQuizActivation}
                    >
                        pozwól nam poznać Twoje preferencje
                    </Button>
                </div>
            </div>
            <div className={styles.topMajors}>
                <p className={styles.topMajorsText}>
                    Najlepsze kierunki informatyczne:
                </p>
                <OverallTop5 />
                <GetUser />
            </div>
        </div>
    );
};

export default Home;
