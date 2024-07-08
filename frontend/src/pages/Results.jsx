import React, { useState, useContext } from 'react';

import styles from '../../styles/pages/Home.module.scss';

import { ThemeContext } from '../contexts/ThemeContext';

import QuizResult from '../components/OverallTop5/QuizResult';


const Results = () => {
    const [flag, setFlag] = useState('results');
    const { theme, setTheme } = useContext(ThemeContext);


    const handleModeChange = () => {
        setTheme(prevState => (prevState === 'light' ? 'dark' : 'light'));
    };

    const handleQuizActivation = () => {
        setCurrentFold('quiz');
    };



    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.logoContainer}>
                    <img
                        src="/bazujepl_logo_orange.png"
                        alt="Bazuje.it"
                        className={styles.logo}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        className={styles.inputText}
                    // placeholder="Wyszukaj uczelnię..."
                    />
                    <img
                        src={theme === 'dark' ? "/moon_icon.png" : "/sun_icon_orange.png"}
                        alt="Change theme"
                        className={styles.themeIcon}
                        onClick={handleModeChange}
                    />
                </div>
            </div>
            <div className={styles.mainResults}>
                <div className={styles.textResults}>
                    <p className={styles.largeText}>
                        Na podstawie <span className={styles.textGradient1}> Twoich </span> preferencji <br />
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
