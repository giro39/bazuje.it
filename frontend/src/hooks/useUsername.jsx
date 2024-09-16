import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react";
import { LoggedUsernameContext } from "../contexts/LoggedUsernameContext";

const SERVER_URL = "http://127.0.0.1:8000";

const useUsername = () => {
    const { loggedUsername, setLoggedUsername } = useContext(
        LoggedUsernameContext
    );

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            const decodedToken = jwtDecode(token);

            axios
                .post(`${SERVER_URL}/api/get_username/`, {
                    inputData: decodedToken.user_id,
                })
                .then((response) => {
                    setLoggedUsername(response.data.username);
                })
                .catch((error) => {
                    console.error(
                        "There was an error fetching the username!",
                        error
                    );
                });
        }
    }, [loggedUsername, setLoggedUsername]);
};

export default useUsername;
