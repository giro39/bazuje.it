import { useNavigate } from "react-router-dom";
import styles from "../../../styles/components/BasicComponents/MajorPageTopper/MajorPageTopper.module.scss";

const MajorPageTopper = ({ chosenMajor }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.majorPageTopper}>
            <p
                className={styles.majorName}
                onClick={() => navigate(`../kierunki/${chosenMajor.id}/`)}
            >
                {chosenMajor.kierunek}
            </p>
            <p className={styles.universityName}>{chosenMajor.uczelnia}</p>
        </div>
    );
};

export default MajorPageTopper;
