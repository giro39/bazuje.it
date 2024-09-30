import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Button from "../BasicComponents/Button/Button";
import styles from "../../styles/components/AddOpinion/AddOpinion.module.scss";

const SERVER_URL = "http://127.0.0.1:8000";

const AddOpinion = ({
    isOpen,
    onClose,
    majorId,
    majorName,
    opinionToEdit,
    onOpinionUpdated,
}) => {
    const containerRef = useRef(null);
    const textareaRef = useRef(null);
    const [grade, setGrade] = useState(50);
    const [opinion, setOpinion] = useState("");

    useEffect(() => {
        if (opinionToEdit) {
            console.log(opinionToEdit);
            setGrade(opinionToEdit.grade);
            setOpinion(opinionToEdit.text);
        } else {
            setGrade(50);
            setOpinion("");
        }
    }, [opinionToEdit]);

    const handleTextareaInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleBackgroundClick = (e) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(e.target) &&
            opinion.length < 10
        ) {
            handleClose();
        }
    };

    const handleClose = () => {
        setGrade(50);
        setOpinion("");
        onClose();
    };

    const postOpinion = () => {
        const token = localStorage.getItem("access");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;
            const request = opinionToEdit
                ? axios.patch(
                    `${SERVER_URL}/api/edytuj_opinie/${opinionToEdit.opinia}`,
                    {
                        ocena: grade,
                        opis: opinion,
                    }
                )
                : axios.post(`${SERVER_URL}/api/dodaj_opinie/`, {
                    kierunek: majorId,
                    user: userId,
                    ocena: grade,
                    opis: opinion,
                });

            request
                .then((response) => {
                    if (onOpinionUpdated) {
                        onOpinionUpdated(response.data);
                    }
                    handleClose();
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    useEffect(() => {
        handleTextareaInput();
    }, []);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleBackgroundClick}>
            <div className={styles.container} ref={containerRef}>
                <button className={styles.closeButton} onClick={handleClose}>
                    x
                </button>
                <h2 className={styles.title}>
                    {opinionToEdit ? "Edytuj opinię o: " : "Oceń kierunek: "}
                    <span className={styles.majorName}>{majorName}</span>
                </h2>
                <div className={styles.rating}>
                    <input
                        type="range"
                        value={grade}
                        min="0"
                        max="100"
                        className={styles.ratingSlider}
                        onChange={(e) => setGrade(e.target.value)}
                    ></input>
                    <span className={styles.ratingValue}>
                        <span className={styles.value}>{grade}</span>
                        <span className={styles.valueOutOf}>/100</span>
                    </span>
                </div>
                <textarea
                    ref={textareaRef}
                    rows="1"
                    className={styles.opinionText}
                    placeholder="Podziel się swoją opinią..."
                    onInput={handleTextareaInput}
                    value={opinion}
                    onChange={(e) => setOpinion(e.target.value)}
                ></textarea>
                <Button
                    buttonType="contained"
                    buttonSize="medium"
                    onClick={postOpinion}
                >
                    {opinionToEdit ? "Zaktualizuj opinię" : "Prześlij ocenę"}
                </Button>
            </div>
        </div>
    );
};

export default AddOpinion;
