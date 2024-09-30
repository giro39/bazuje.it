import { useState } from "react";
import styles from "../../styles/components/Opinion/Opinion.module.scss";

const SERVER_URL = "http://127.0.0.1:8000";

const Grade = ({ opinionId, userGrade }) => {
    const [grade, setGrade] = useState(userGrade);

    return (
        <div className={styles.gradeContainer}>
            <p>
                {grade}
                <span className={styles.gradient}>/100</span>
            </p>
        </div>
    );
};

export default Grade;
