import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/components/Navbar/Navbar.module.scss";

import { ThemeContext } from "../../contexts/ThemeContext";

const Navbar = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const navigate = useNavigate();

    const handleClickOnLogo = () => {
        navigate("/home");
    };

    const handleModeChange = () => {
        setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img
                    src={
                        theme === "dark"
                            ? "/bazujepl_logo_orange.png"
                            : "/bazujepl_logo_blue.png"
                    }
                    alt="Bazuje.it"
                    className={styles.logo}
                    onClick={handleClickOnLogo}
                />
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    className={styles.inputText}
                    // placeholder="Wyszukaj uczelnię..."
                />
                <img
                    src={
                        theme === "dark"
                            ? "/moon_icon.png"
                            : "/sun_icon_orange.png"
                    }
                    alt="Change theme"
                    className={styles.themeIcon}
                    onClick={handleModeChange}
                />
            </div>
        </div>
    );
};

export default Navbar;
