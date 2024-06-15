import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import ProtectedRoute from "./components/ProtectedRoute"


import '../styles/App.scss';

const Logout = () => {
    localStorage.clear()
    return <Navigate to="/login" />
}
  
const RegisterAndLogout = () => {
    localStorage.clear()
    return <Register />
}

const App = () => {
    return (
        <BrowserRouter>
            <main theme='dark'>
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
            </main>
        </BrowserRouter>
    )
};
export default App;