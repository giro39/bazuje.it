import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import BestComment from "../components/BestComment/BestComment";

import styles from "../styles/pages/Major.module.scss";

const SERVER_URL = "http://127.0.0.1:8000";

const Major = () => {

    const [chosenKierunek, setChosenKierunek] = useState({});

    useEffect(() => {
        const kierunek_id = majorId;

        axios
            .post(`${SERVER_URL}/api/chosen_kierunek/`, {
                kierunek_id: kierunek_id,
            })
            .then((response) => {
                console.log(response.data);
                setChosenKierunek(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const { majorId } = useParams();
    return (
        <div className={styles.container}>
            <Navbar />
            <BestComment majorId={majorId} />
        </div>
    );
};

export default Major;
