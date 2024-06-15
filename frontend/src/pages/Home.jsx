import React, { useContext, useState } from 'react';

import OverallTop5 from "../components/OverallTop5/OverallTop5";

import styles from '../../styles/pages/Home.module.scss';

import { ThemeContext } from '../contexts/ThemeContext';

const Home = () => {
    const {theme, setTheme} = useContext(ThemeContext);

    const handleModeChange = () => {
        setTheme(prevState => (prevState === 'light' ? 'dark' : 'light'));
    }

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.logoContainer}>
                    <img 
                        src="../../public/bazujepl_logo_orange.png" 
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
                        src={theme === 'dark' ? "../../public/moon_icon.png" : "../../public/sun_icon_orange.png"}
                        alt="Change theme" 
                        className={styles.themeIcon}
                        onClick={handleModeChange}
                    />
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.textMain}>
                    <p className={styles.largeText}>
                        Wyszukaj swoją <br /> 
                        przyszłą uczelnię na <br /> 
                        podstawie <span className={styles.textGradient1}> Twojej </span> 
                        wizji <br />
                        <span className={styles.textGradient2}> siebie </span>
                    </p>
                </div>
                <div className={styles.buttonMain}>
                    <button className={styles.quizButton}>
                        pozwól nam poznać Twoje preferencje
                    </button>
                </div>
            </div>
            <div className={styles.topMajors}>
                <p className={styles.topMajorsText}>Najlepsze kierunki informatyczne:</p>
                <OverallTop5 />
            </div>
        </div>
    );
};

export default Home;
