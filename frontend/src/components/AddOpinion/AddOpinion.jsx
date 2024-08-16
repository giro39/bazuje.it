import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "../BasicComponents/Button/Button";
import styles from "../../styles/components/AddOpinion/AddOpinion.module.scss";

const AddOpinion = ({ isOpen, onClose }) => {
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

    useEffect(() => {
        handleTextareaInput();
    }, []);

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <button className={styles.closeButton} onClick={onClose}>
                    x
                </button>
                <h2 className={styles.title}>
                    Oceń kierunek:{" "}
                    <span className={styles.majorName}>Nazwa kierunku</span>
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
                <Button buttonType="contained" buttonSize="medium">
                    Prześlij ocenę
                </Button>
            </div>
        </div>,
        document.getElementById("overlay")
    );
};

export default AddOpinion;
