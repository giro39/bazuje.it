import { createPortal } from "react-dom";
import Button from "../BasicComponents/Button/Button";
import styles from "../../styles/components/AddOpinion/AddOpinion.module.scss";

const AddOpinion = ({ isOpen, onClose }) => {
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
                        min="0"
                        max="100"
                        className={styles.ratingSlider}
                    ></input>
                    <span className={styles.ratingValue}>
                        <span className={styles.value}>50</span>
                        <span className={styles.valueOutOf}>/100</span>
                    </span>
                </div>
                <textarea
                    className={styles.opinionText}
                    placeholder="Podziel się swoją opinią..."
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
