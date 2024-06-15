import styles from "../../../styles/OverallTop5.module.scss";
import MajorPreview from "../MajorPreview/MajorPreview";

const OverallTop5 = () => {
  return (
    <div className={styles.container}>
      <MajorPreview
        majorTitle={"Informatyka"}
        universityTitle={"Politechnika Poznańska"}
        rating={69.8}
      />
    </div>
  );
};

export default OverallTop5;
