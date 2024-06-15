import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import { ThemeContext, initialThemeContext } from './contexts/ThemeContext';

import { PrintUczelnias } from './components/PrintUczelnias/PrintUczelnias';

import '../styles/App.scss';

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

    return (
        <BrowserRouter>
            <main theme={theme}>
                <ThemeContext.Provider value={{ theme, setTheme }}>
                    <Routes>
                        <Route 
                            path='/' 
                            element={<Navigate to={'/home'} replace={true} />}
                        />
                        <Route 
                            path='/home'
                            element={
                                // <ProtectedRoute>
                                    <Home />
                                    
                                // </ProtectedRoute>
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
                </ThemeContext.Provider>
            </main>
        </BrowserRouter>
    )
};
export default App;
