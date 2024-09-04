import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../../styles/components/Navbar/Navbar.module.scss";

import { ThemeContext } from "../../contexts/ThemeContext";
import { UsernameContext } from "../../contexts/UsernameContext";

import SearchBar from "../SearchBar/SearchBar";
import useUsername from "../../hooks/useUsername";

import Button from "../BasicComponents/Button/Button";

const Navbar = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const { username } = useContext(UsernameContext);
    useUsername();

    useEffect(() => {
        console.log("Username changed to: ", username);
    }, [username]);

    const navigate = useNavigate();
    const location = useLocation().pathname;

    const handleModeChange = () => {
        setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
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
        </div>
    );
};

export default Navbar;
