import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import BestComment from "../components/BestComment/BestComment";
import usePostAndFetch from "../hooks/usePostAndFetch";

import styles from "../styles/pages/Major.module.scss";

const SERVER_URL = "http://127.0.0.1:8000";

const Major = () => {
    const { majorId } = useParams();
    const { data, loading, error } = usePostAndFetch(
        majorId,
        `${SERVER_URL}/api/chosen_kierunek/`
    );

    if (loading) return <div className={styles.container}></div>;

    if (error)
        return <div className={styles.container}>Błąd pozyskania danych.</div>;

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.main}>
                <p className={styles.majorName}>{data?.kierunek}</p>
                <p className={styles.universityName}>{data?.uczelnia}</p>
                <p className={styles.mostAccurateOpinion}>
                    Najtrafniejsza opinia
                </p>
            </div>
            <BestComment majorId={majorId} />
            <div className={styles.subjects}>
                {data?.listaPrzedmiotow &&
                    data.listaPrzedmiotow.map((major, index) => (
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
