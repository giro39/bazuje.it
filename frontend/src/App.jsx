import React, { useState, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Major from "./pages/Major";
import Quiz from "./pages/Quiz";
import Register from "./pages/Register";
import Results from "./pages/Results";

import { PortalBoxParent } from "./components/PortalBox";

import { ResultContext, initialResultContext } from "./contexts/ResultContext";
import { ThemeContext, initialThemeContext } from "./contexts/ThemeContext";
import {
    UsernameContext,
    initialUsernameContext,
} from "./contexts/UsernameContext";
import {
    PortalBoxContext,
    initialPortalBoxContext,
} from "./contexts/PortalBoxContext";

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
    const [username, setUsername] = useState(initialUsernameContext);
    const portalBox = useRef();
    return (
        <BrowserRouter>
            <main theme={theme}>
                <ThemeContext.Provider value={{ theme, setTheme }}>
                    <ResultContext.Provider value={{ result, setResult }}>
                        <UsernameContext.Provider
                            value={{ username, setUsername }}
                        >
                            <PortalBoxContext.Provider
                                value={portalBox.current}
                            >
                                <PortalBoxParent ref={portalBox} />
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <Navigate
                                                to={"/home"}
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
                        </UsernameContext.Provider>
                    </ResultContext.Provider>
                </ThemeContext.Provider>
            </main>
        </BrowserRouter>
    );
};
export default App;
