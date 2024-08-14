import styles from "../../styles/components/Opinion/Opinion.module.scss";

import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const Rating = ({ rating }) => {
    return (
        <div className={styles.ratingContainer}>
            <FaArrowUp className={styles.arrowUp} />
            <p className={styles.rating}>{rating}</p>
            <FaArrowDown className={styles.arrowDown} />
        </div>
    );
};

export default Rating;
