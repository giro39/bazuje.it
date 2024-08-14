import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../../styles/components/Navbar/Navbar.module.scss";

import { ThemeContext } from "../../contexts/ThemeContext";
import { UsernameContext } from "../../contexts/UsernameContext";

import { default as useUsername } from "../../hooks/useUsername";
import Button from "../BasicComponents/Button/Button";

const Navbar = () => {
    useUsername();

    const { theme, setTheme } = useContext(ThemeContext);
    const { username } = useContext(UsernameContext);

    const navigate = useNavigate();
    const location = useLocation().pathname;

    const handleModeChange = () => {
        setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
    };

    return (
        <div className={styles.navbar}>
            <button className={styles.logoContainer}>
                <img
                    src={
                        theme === "dark"
                            ? "/bazujepl_logo_orange.png"
                            : "/bazujepl_logo_blue.png"
                    }
                    alt="Bazuje.it"
                    className={styles.logo}
                    onClick={() => navigate("/home")}
                />
            </button>
            {location === "/login" || location === "/register" ? null : (
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

                    {!username ? (
                        <Button
                            onClick={() => navigate("/login")}
                            buttonType={"white"}
                            buttonSize={"medium"}
                        >
                            Zaloguj się
                        </Button>
                    ) : (
                        <p className={styles.helloText}>Hej {username}!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
