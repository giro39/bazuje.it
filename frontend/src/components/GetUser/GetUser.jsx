import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'; // poprawka importu
import axios from 'axios';

const SERVER_URL = "http://127.0.0.1:8000";

const GetUser = () => {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.user_id);

            axios.post(`${SERVER_URL}/api/get_username/`, { user_id: decodedToken.user_id })
                .then(response => {
                    setUsername(response.data.username);
                })
                .catch((error) => {
                    console.error("There was an error fetching the username!", error);
                });
        }
    }, []);

    return (
        <div>
            <h1>User ID: {userId}</h1>
            <h1>Username: {username}</h1>
        </div>
    );
};

export default GetUser;