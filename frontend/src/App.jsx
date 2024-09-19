import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Major from "./pages/Major";
import MajorOpinions from "./pages/MajorOpinions";
import Quiz from "./pages/Quiz";
import Register from "./pages/Register";
import Results from "./pages/Results";

import { PortalBoxParent } from "./components/PortalBox";

import {
    LoggedUsernameContext,
    initialLoggedUsernameContext,
} from "./contexts/LoggedUsernameContext";
import { PortalBoxContext } from "./contexts/PortalBoxContext";
import { ResultContext, initialResultContext } from "./contexts/ResultContext";
import { ThemeContext, initialThemeContext } from "./contexts/ThemeContext";

import Navbar from "./components/Navbar/Navbar";
import "./styles/App.scss";

const Logout = () => {
    localStorage.clear();
    return <Navigate to="/login" />;
};

const RegisterAndLogout = () => {
    localStorage.clear();
    return <Register />;
};

const App = () => {
    const [theme, setTheme] = useState(initialThemeContext);
    const [result, setResult] = useState(initialResultContext);
    const [loggedUsername, setLoggedUsername] = useState(
        initialLoggedUsernameContext
    );
    const portalBox = useRef();
    const [token, setToken] = useState(localStorage.getItem("access"));

    useEffect(() => {
        setToken(localStorage.getItem("access"));
    }, [token]);

    return (
        <BrowserRouter>
            <main theme={theme}>
                <ThemeContext.Provider value={{ theme, setTheme }}>
                    <ResultContext.Provider value={{ result, setResult }}>
                        <LoggedUsernameContext.Provider
                            value={{ loggedUsername, setLoggedUsername }}
                        >
                            <PortalBoxContext.Provider
                                value={portalBox.current}
                            >
                                <Navbar />
                                <PortalBoxParent ref={portalBox} />
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <Navigate
                                                to="/home"
                                                replace={true}
                                            />
                                        }
                                    />
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/quiz" element={<Quiz />} />
                                    <Route
                                        path="/results"
                                        element={<Results />}
                                    />
                                    <Route
                                        path="/kierunki/:majorId"
                                        element={<Major />}
                                    />
                                    <Route
                                        path="/kierunki/:majorId/opinions"
                                        element={<MajorOpinions />}
                                    />
                                    <Route path="/login" element={<Login />} />
                                    <Route
                                        path="/logout"
                                        element={<Logout />}
                                    />
                                    <Route
                                        path="/register"
                                        element={<RegisterAndLogout />}
                                    />
                                    <Route
                                        path="*"
                                        element={<h1>404. Not found</h1>}
                                    />
                                </Routes>
                            </PortalBoxContext.Provider>
                        </LoggedUsernameContext.Provider>
                    </ResultContext.Provider>
                </ThemeContext.Provider>
            </main>
        </BrowserRouter>
    );
};

export default App;
