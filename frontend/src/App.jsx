import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Results from "./pages/Results";

import ProtectedRoute from "./components/ProtectedRoute";

import { ThemeContext, initialThemeContext } from './contexts/ThemeContext';
import { ResultContext, initialResultContext } from './contexts/ResultContext';

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

    return (
        <BrowserRouter>
            <main theme={theme}>
                <ThemeContext.Provider value={{ theme, setTheme }}>
                    <ResultContext.Provider value={{ result, setResult }}>
                        <Routes>
                            <Route
                                path='/'
                                element={<Navigate to={'/home'} replace={true} />}
                            />
                            <Route
                                path='/home'
                                element={
                                    <Home />
                                }
                            />
                            <Route
                                path='/quiz'
                                element={
                                    <Quiz />
                                }
                            />
                            <Route
                                path='/results'
                                element={
                                    <Results />
                                }
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/register" element={<RegisterAndLogout />} />

                            <Route
                                path='*'
                                element={<h1>404. Not found</h1>}
                            />
                        </Routes>
                    </ResultContext.Provider>
                </ThemeContext.Provider>
            </main>
        </BrowserRouter>
    );
};
export default App;
