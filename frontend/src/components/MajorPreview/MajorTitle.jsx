import styles from "../../../styles/MajorPreview.module.scss";

const MajorTitle = ({ majorTitle, universityTitle }) => {
  return (
    <div className={styles.title}>
      <h3>{majorTitle}</h3>
      <h5>{universityTitle}</h5>
    </div>
  );
};

export default MajorTitle;
