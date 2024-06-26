import styles from "../../../styles/MajorPreview.module.scss";
import MajorRating from "./MajorRating";
import MajorTitle from "./MajorTitle";

const MajorPreview = ({ majorTitle, universityTitle, rating }) => {
  return (
    <div className={styles.container}>
      <MajorTitle
        majorTitle={majorTitle}
        universityTitle={universityTitle}
      />
      {rating === -1 ? <div></div> : <MajorRating rating={rating} />}
    </div>
  );
};

export default MajorPreview;
