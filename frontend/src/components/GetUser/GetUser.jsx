import { useEffect, useState, useContext } from "react";
import { jwtDecode } from 'jwt-decode';

const SERVER_URL = "http://127.0.0.1:8000";


const GetUser = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id);
        }
    }, []);

    return (
        <div>
            <h1>User ID: {userId}</h1>
            <h1>Username:</h1>
        </div>
    );
};

export default GetUser;