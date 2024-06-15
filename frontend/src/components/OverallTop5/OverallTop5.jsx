import styles from "../../../styles/OverallTop5.module.scss";
import MajorPreview from "../MajorPreview/MajorPreview";

const OverallTop5 = () => {
  return (
    <div className={styles.container}>
      <MajorPreview
        majorTitle={"Informatyka"}
        universityTitle={"Uniwersytet Adama Mickiewicza"}
        rating={81.7}
      />
      <MajorPreview
        majorTitle={"Informatyka"}
        universityTitle={"Politechnika Poznańska"}
        rating={76.1}
      />
      <MajorPreview
        majorTitle={"Bioinformatyka"}
        universityTitle={"Politechnika Poznańska"}
        rating={71.1}
      />
    </div>
  );
};

export default OverallTop5;
