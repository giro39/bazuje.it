import styles from "../../styles/components/MajorPreview/MajorPreview.module.scss";
import RatingNumber from "../BasicComponents/RatingNumber/RatingNumber";

const MajorRating = ({ rating }) => {
    return (
        <h4 className={styles.rating}>
            <RatingNumber number={rating} />/<span>100</span>
        </h4>
    );
};

export default MajorRating;
