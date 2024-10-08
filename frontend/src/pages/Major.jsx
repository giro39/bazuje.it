import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";

import AddOpinion from "../components/AddOpinion/AddOpinion";
import Button from "../components/BasicComponents/Button/Button";
import BestComment from "../components/BestComment/BestComment";

import PortalBox from "../components/PortalBox";

import { LoggedUsernameContext } from "../contexts/LoggedUsernameContext";

import MajorPageTopper from "../components/BasicComponents/MajorPageTopper/MajorPageTopper";
import styles from "../styles/pages/Major.module.scss";

const SERVER_URL = "http://127.0.0.1:8000";

const Major = () => {
    const [chosenKierunek, setChosenKierunek] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userHasOpinion, setUserHasOpinion] = useState(false);

    const { loggedUsername } = useContext(LoggedUsernameContext);

    const { majorId } = useParams();

    const navigate = useNavigate();

    const toggleModal = () => {
        setIsModalOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const kierunek_id = majorId;

        axios
            .post(`${SERVER_URL}/api/chosen_kierunek/`, {
                inputData: kierunek_id,
            })
            .then((response) => {
                setChosenKierunek(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        const token = localStorage.getItem("access");
        if (token) {
            axios
                .post(`${SERVER_URL}/api/has_opinion/`, {
                    majorId: majorId,
                    userId: jwtDecode(token).user_id,
                })
                .then((response) => {
                    setUserHasOpinion(response.data.exists);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [majorId]);

    return (
        <div className={styles.container}>
            <PortalBox>
                <AddOpinion
                    isOpen={isModalOpen}
                    onClose={toggleModal}
                    majorId={majorId}
                    majorName={chosenKierunek.kierunek}
                />
            </PortalBox>
            <div className={styles.main}>
                <MajorPageTopper
                    chosenMajor={{
                        id: chosenKierunek.kierunekId,
                        kierunek: chosenKierunek.kierunek,
                        uczelnia: chosenKierunek.uczelnia,
                    }}
                />
                <div className={styles.aboveMostAccOpinion}>
                    <p className={styles.mostAccurateOpinion}>
                        Najtrafniejsza opinia
                    </p>
                    {!loggedUsername ? (
                        <Button
                            buttonType="white"
                            buttonSize="medium"
                            onClick={() => navigate("/login")}
                        >
                            Zaloguj się, aby dodać opinię
                        </Button>
                    ) : !userHasOpinion ? (
                        <Button
                            buttonType="white"
                            buttonSize="medium"
                            onClick={toggleModal}
                        >
                            Dodaj opinię
                        </Button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <BestComment majorId={majorId} />
            <div className={styles.subjects}>
                {chosenKierunek.listaPrzedmiotow &&
                    chosenKierunek.listaPrzedmiotow.map((major, index) => (
                        <div className={styles.subject} key={index}>
                            <p className={styles.subjectName}>{major.nazwa}</p>
                            <p className={styles.subjectGrade}>
                                {Math.round(major.sredniaOcen * 10) / 10}
                                <span className={styles.oneHundred}>/100</span>
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Major;
