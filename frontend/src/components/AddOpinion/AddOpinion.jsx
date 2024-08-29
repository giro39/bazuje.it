import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Button from "../BasicComponents/Button/Button";
import styles from "../../styles/components/AddOpinion/AddOpinion.module.scss";

const SERVER_URL = "http://127.0.0.1:8000";

const AddOpinion = ({ isOpen, onClose, majorId, majorName }) => {
    const containerRef = useRef(null);
    const textareaRef = useRef(null);
    const [rating, setRating] = useState(50);
    const [opinion, setOpinion] = useState("");

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
        setRating(50);
        setOpinion("");
        onClose();
    };

    const postOpinion = () => {
        const token = localStorage.getItem("access");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;
            axios
                .post(`${SERVER_URL}/api/dodaj_opinie/`, {
                    kierunek: majorId,
                    user: userId,
                    ocena: rating,
                    opis: opinion,
                })
                .then((response) => {
                    console.log(response.data, response.status, "success!");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        handleClose();
    };

    useEffect(() => {
        handleTextareaInput();
    }, []);

    if (!isOpen) return <></>;

    return (
        <div className={styles.overlay} onClick={handleBackgroundClick}>
            <div className={styles.container} ref={containerRef}>
                <button className={styles.closeButton} onClick={handleClose}>
                    x
                </button>
                <h2 className={styles.title}>
                    Oceń kierunek:{" "}
                    <span className={styles.majorName}>{majorName}</span>
                </h2>
                <div className={styles.rating}>
                    <input
                        type="range"
                        value={rating}
                        min="0"
                        max="100"
                        className={styles.ratingSlider}
                        onChange={(e) => setRating(e.target.value)}
                    ></input>
                    <span className={styles.ratingValue}>
                        <span className={styles.value}>{rating}</span>
                        <span className={styles.valueOutOf}>/100</span>
                    </span>
                </div>
                <textarea
                    ref={textareaRef}
                    rows="1"
                    className={styles.opinionText}
                    placeholder="Podziel się swoją opinią..."
                    onInput={handleTextareaInput}
                    onChange={(e) => setOpinion(e.target.value)}
                ></textarea>
                <Button
                    buttonType="contained"
                    buttonSize="medium"
                    onClick={postOpinion}
                >
                    Prześlij ocenę
                </Button>
            </div>
        </div>
    );
};

export default AddOpinion;