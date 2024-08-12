import React from "react";

import styles from "../styles/pages/Home.module.scss";

import QuizResult from "../components/OverallTop5/QuizResult";

const Results = () => {
    return (
        <div className={styles.container}>
            <div className={styles.mainResults}>
                <div className={styles.textResults}>
                    <p className={styles.largeText}>
                        Na podstawie{" "}
                        <span className={styles.textGradient1}> Twoich </span>{" "}
                        preferencji <br />
                        wybraliśmy kierunki dla <br />
                        <span className={styles.textGradient2}> Ciebie</span>:
                    </p>
                </div>
            </div>
            <div className={styles.topMajors}>
                <QuizResult />
            </div>
        </div>
    );
};

export default Results;
