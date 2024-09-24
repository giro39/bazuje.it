import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../../styles/components/Navbar/Navbar.module.scss";

import { LoggedUsernameContext } from "../../contexts/LoggedUsernameContext";
import { initialThemeContext, ThemeContext } from "../../contexts/ThemeContext";

import useUsername from "../../hooks/useUsername";

import SearchBar from "../SearchBar/SearchBar";

import Button from "../BasicComponents/Button/Button";

const Navbar = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const { loggedUsername } = useContext(LoggedUsernameContext);
    useUsername();

    const navigate = useNavigate();
    const location = useLocation().pathname;

    const intialState = localStorage.getItem("theme") || initialThemeContext;

    useEffect(() => {
        setTheme(intialState);
    }, [setTheme, intialState]);

    const handleModeChange = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        localStorage.setItem("theme", newTheme);
        setTheme(() => newTheme);
    };

    if (location === "/login" || location === "/register") {
        return null;
    }

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

            <div className={styles.inputContainer}>
                <SearchBar />
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

                {!loggedUsername ? (
                    <Button
                        onClick={() => navigate("/login")}
                        buttonType={"white"}
                        buttonSize={"medium"}
                    >
                        Zaloguj się
                    </Button>
                ) : (
                    <p className={styles.helloText}>Hej {loggedUsername}!</p>
                )}
            </div>
        </div>
    );
};

export default Navbar;
