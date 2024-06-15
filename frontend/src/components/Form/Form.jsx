import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";


function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let valid_password = true;
            if(name === "Register"){
                if(password.length < 8 || password === password.toLowerCase() || /\d/.test(password) === false){
                    alert("The password should contain a minimum of 8 characters, 1 uppercase letter, and 1 number.");
                    valid_password = false;
                }

                if(password != password2){
                    alert("Passwords don't match");
                    valid_password = false;
                } 
            }
            if(method === "login" || valid_password === true){
                const res = await api.post(route, { username, password })
                if (method === "login") {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                    navigate("/")
                } else {
                    navigate("/login")
                }
            }

        
        } catch (error) {
            alert(error)
        } finally {
        }
    };

    if (method === "login"){
        return (
            <form onSubmit={handleSubmit} className="form-container">
                <h1>{name}</h1>
                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className="form-button" type="submit">
                    {name}
                </button>
            </form>
        );
    }
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                className="form-input"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Repeat Password"
            />
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
    
}

export default Form