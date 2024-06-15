import React, { useContext, useState } from 'react';

import styles from '../../styles/pages/Home.module.scss';

import { ThemeContext } from '../contexts/ThemeContext';

const Home = () => {
    const {theme, setTheme} = useContext(ThemeContext);

    const handleModeChange = () => {
        setTheme(prevState => (prevState === 'light' ? 'dark' : 'light'));
    }

    return (
        <div className={styles.container}>
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
    );
};

export default Home;
