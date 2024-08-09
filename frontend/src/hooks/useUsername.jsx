import axios from "axios";
import { jwtDecode } from "jwt-decode"; // poprawka importu
import { useContext, useEffect } from "react";
import { UsernameContext } from "../contexts/UsernameContext";

const SERVER_URL = "http://127.0.0.1:8000";

const useUsername = () => {
    const { username, setUsername } = useContext(UsernameContext);

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            const decodedToken = jwtDecode(token);

            axios
                .post(`${SERVER_URL}/api/get_username/`, {
                    inputData: decodedToken.user_id,
                })
                .then((response) => {
                    setUsername(response.data.username);
                })
                .catch((error) => {
                    console.error(
                        "There was an error fetching the username!",
                        error
                    );
                });
        }
    }, []);
};

export default useUsername;
