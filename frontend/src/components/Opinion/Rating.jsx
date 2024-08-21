import styles from "../../styles/components/Opinion/Opinion.module.scss";

import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const Rating = ({ rating }) => {
    return (
        <div className={styles.ratingContainer}>
            <button className={styles.ratingButton}>
                <FaArrowUp className={styles.arrowUp} />
            </button>
            <p className={styles.rating}>{rating}</p>
            <button className={styles.ratingButton}>
                <FaArrowDown className={styles.arrowDown} />
            </button>
        </div>
    );
};

export default Rating;
