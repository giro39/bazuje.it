import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import BestComment from "../components/BestComment/BestComment";

import styles from "../styles/pages/Major.module.scss";

const SERVER_URL = "http://127.0.0.1:8000";

const Major = () => {
    const [chosenKierunek, setChosenKierunek] = useState({});

    useEffect(() => {
        const kierunek_id = majorId;

        axios
            .post(`${SERVER_URL}/api/chosen_kierunek/`, {
                inputData: kierunek_id,
            })
            .then((response) => {
                setChosenKierunek(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const { majorId } = useParams();
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.main}>
                <p className={styles.majorName}>{chosenKierunek.kierunek}</p>
                <p className={styles.universityName}>
                    {chosenKierunek.uczelnia}
                </p>
                <p className={styles.mostAccurateOpinion}>
                    Najtrafniejsza opinia
                </p>
            </div>
            <BestComment majorId={majorId} />
            <div className={styles.subjects}>
                {chosenKierunek.listaPrzedmiotow &&
                    chosenKierunek.listaPrzedmiotow.map((major, index) => (
                        <div className={styles.subject} key={index}>
                            <p className={styles.subjectName}>{major.nazwa}</p>
                            <p className={styles.subjectGrade}>
                                {major.sredniaOcen}
                                <span className={styles.oneHundred}>/100</span>
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Major;
