import styles from "../../styles/components/MajorPreview/MajorPreview.module.scss";

const MajorTitle = ({ majorTitle, universityTitle }) => {
    return (
        <div className={styles.title}>
            <h3>{majorTitle}</h3>
            <h5>{universityTitle}</h5>
        </div>
    );
};

export default MajorTitle;
