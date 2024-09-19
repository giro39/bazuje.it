import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

import Button from "../../components/BasicComponents/Button/Button";

import { LoggedUsernameContext } from "../../contexts/LoggedUsernameContext";
import styles from "../../styles/components/Form/Form.module.scss";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errPassword, setErrPassword] = useState({
        contain: false,
        match: false,
    });

    const { loggedUsername, setLoggedUsername } = useContext(
        LoggedUsernameContext
    );

    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleRegisterNowButton = () => {
        navigate(method === "login" ? "/register" : "/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let valid_password = true;
            if (name === "Register") {
                let containError =
                    password.length < 8 ||
                    password === password.toLowerCase() ||
                    !/\d/.test(password);

                let matchError = password !== password2;

                setErrPassword((prevState) => ({
                    ...prevState,
                    contain: containError,
                    match: matchError,
                }));

                if (containError || matchError) {
                    valid_password = false;
                }
            }

            if (method === "login" || valid_password === true) {
                const res = await api.post(route, { username, password });
                if (method === "login") {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                    setLoggedUsername(username);
                    navigate("/");
                } else {
                    navigate("/login");
                }
            }
        } catch (error) {
            alert(error);
        }
    };

    if (method === "login") {
        return (
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.titleContainer}>
                        <p className={styles.title}>
                            Zaloguj się na swoje konto
                        </p>
                    </div>
                    <div className={styles.formInputs}>
                        <input
                            className={styles.input}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Login"
                        />
                        <input
                            className={styles.input}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Hasło"
                        />
                        <Button
                            buttonType="contained"
                            buttonSize="medium"
                            type="submit"
                        >
                            Zaloguj się
                        </Button>
                        <p className={styles.account}>
                            Nie masz jeszcze konta na bazuje.it?{" "}
                            <span
                                className={styles.switchLoginRegister}
                                onClick={handleRegisterNowButton}
                            >
                                Zarejestruj się
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.titleContainer}>
                    <p className={styles.title}>Załóż nowe konto</p>
                </div>
                <div className={styles.formInputs}>
                    <input
                        className={styles.input}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Login"
                    />
                    <input
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Hasło"
                    />
                    <p
                        className={styles.error}
                        style={{
                            display: errPassword.contain ? "block" : "none",
                        }}
                    >
                        Hasło powinno zawierać minimum 8 znaków, <br />
                        jedną cyfrę i jedną wielką literę.
                    </p>
                    <input
                        className={styles.input}
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="Powtórz hasło"
                    />
                    <p
                        className={styles.error}
                        style={{
                            display: errPassword.match ? "block" : "none",
                        }}
                    >
                        Hasła nie są identyczne
                    </p>
                    <Button
                        buttonType="contained"
                        buttonSize="medium"
                        type="submit"
                    >
                        Zarejestruj się
                    </Button>
                    <p className={styles.account}>
                        Masz już konto na bazuje.it?{" "}
                        <span
                            className={styles.switchLoginRegister}
                            onClick={handleRegisterNowButton}
                        >
                            Zaloguj się
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Form;
