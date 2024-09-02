import { useParams } from "react-router-dom";
import MajorPageTopper from "../components/BasicComponents/MajorPageTopper/MajorPageTopper";
import Opinion from "../components/Opinion/Opinion";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import styles from "../styles/pages/MajorOpinions.module.scss";

const SERVER_URL = "http://127.0.0.1:8000";

const MajorOpinions = () => {
    const { majorId } = useParams();
    const [opinions, setOpinions] = useState([]);
    const [majorInfo, setMajorInfo] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("access");
        const decodedToken = jwtDecode(token);

        axios
            .post(`${SERVER_URL}/api/all_opinions/`, {
                kierunek: majorId,
                user: decodedToken.user_id,
            })
            .then((response) => {
                setOpinions(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios
            .post(`${SERVER_URL}/api/chosen_kierunek/`, {
                inputData: majorId,
            })
            .then((response) => {
                setMajorInfo(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [majorId]);

    const allOpinions = opinions.map((opinion, index) => (
        console.log(opinion),
        <Opinion
            key={index}
            text={opinion.text}
            rating={opinion.rating}
            user={opinion.user}
            opinionId={opinion.opinia}
        />
    ));

    return (
        <div className={styles.container}>
            {majorInfo.kierunek && (
                <MajorPageTopper
                    chosenMajor={{
                        kierunek: majorInfo.kierunek,
                        uczelnia: majorInfo.uczelnia,
                    }}
                />
            )}

            <p className={styles.opinionsOfStudents}>Opinie studentów</p>

            <div className={styles.opinionsContainer}>{allOpinions}</div>
        </div>
    );
};

export default MajorOpinions;
