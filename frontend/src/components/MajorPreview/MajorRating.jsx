import styles from "../../../styles/MajorPreview.module.scss";

const MajorRating = ({ rating }) => {
  return (
    <h4 className={styles.rating}>
      {rating}/<span>100</span>
    </h4>
  );
};

export default MajorRating;
