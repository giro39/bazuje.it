import styles from "../../../styles/components/BasicComponents/MajorPageTopper/MajorPageTopper.module.scss";

const MajorPageTopper = ({ chosenMajor }) => {
    return (
        <div className={styles.majorPageTopper}>
            <p className={styles.majorName}>{chosenMajor.kierunek}</p>
            <p className={styles.universityName}>{chosenMajor.uczelnia}</p>
        </div>
    );
};

export default MajorPageTopper;
