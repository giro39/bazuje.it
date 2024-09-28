import { useState } from "react";
import styles from "../../styles/components/Opinion/Opinion.module.scss";
import RatingNumber from "../BasicComponents/RatingNumber/RatingNumber";

const Grade = ({ opinionId, userGrade }) => {
    const [grade, setGrade] = useState(userGrade);

    return (
        <div className={styles.gradeContainer}>
            <p>
                <RatingNumber number={grade} />
                <span className={styles.gradient}>/100</span>
            </p>
        </div>
    );
};

export default Grade;
