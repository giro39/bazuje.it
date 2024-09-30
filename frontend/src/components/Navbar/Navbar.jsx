import { useContext, useEffect, useState } from "react";
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
    const [isSearchbarOpen, setIsSearchbarOpen] = useState(true);
    const [isEverythingHidden, setIsEverythingHidden] = useState(false);
    const [navbarLogo, setNavbarLogo] = useState("");

    useUsername();

    const navigate = useNavigate();
    const location = useLocation().pathname;

    const intialState = localStorage.getItem("theme") || initialThemeContext;

    useEffect(() => {
        setTheme(intialState);
    }, [setTheme, intialState]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSearchbarOpen(false);
            } else {
                setIsSearchbarOpen(true);
            }
            console.log(isEverythingHidden);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            setNavbarLogo(
                !isSearchbarOpen || isEverythingHidden
                    ? "/bazujepl_mini_logo_orange.png"
                    : "/bazujepl_logo_orange.png"
            );
        } else {
            setNavbarLogo(
                !isSearchbarOpen || isEverythingHidden
                    ? "/bazujepl_mini_logo_blue.png"
                    : "/bazujepl_logo_blue.png"
            );
        }
    }, [isSearchbarOpen, theme]);

    const handleModeChange = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        localStorage.setItem("theme", newTheme);
        setTheme(() => newTheme);
    };

    if (location === "/login" || location === "/register") {
        return null;
    }

    const searchBarComponent = (
        <SearchBar
            className={styles.searchBar}
            isSearchbarOpen={isSearchbarOpen}
            setIsSearchbarOpen={setIsSearchbarOpen}
            setIsEverythingHidden={setIsEverythingHidden}
        />
    );

    return (
        <div className={styles.container}>
            <button className={styles.logoContainer}>
                <img
                    src={navbarLogo}
                    alt="Bazuje.it"
                    className={styles.logo}
                    onClick={() => navigate("/home")}
                />
            </button>
            {!isEverythingHidden ? (
                <div className={styles.navbar}>
                    <div className={styles.inputContainer}>
                        {searchBarComponent}
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
                            <p className={styles.helloText}>
                                Hej {loggedUsername}!
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.navbar}>
                    {searchBarComponent}
                    <p
                        className={styles.closeSearchbar}
                        onClick={() => {
                            setIsEverythingHidden(false);
                            setIsSearchbarOpen(false);
                        }}
                    >
                        x
                    </p>
                </div>
            )}
        </div>
    );
};

export default Navbar;
