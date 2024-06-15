import styles from "../../../styles/MajorPreview.module.scss";
import MajorRating from "./MajorRating";
import MajorTitle from "./MajorTitle";

const MajorPreview = ({ majorTitle, universityTitle, rating }) => {
  return (
    <div className={styles.container}>
      <MajorTitle
        majorTitle={"Informatyka"}
        universityTitle={"Politechnika Poznańska"}
      />

      <MajorRating rating={69} />
    </div>
  );
};

export default MajorPreview;
