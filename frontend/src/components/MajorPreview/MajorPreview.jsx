import { useNavigate } from "react-router-dom";
import styles from "../../styles/components/MajorPreview/MajorPreview.module.scss";
import MajorRating from "./MajorRating";
import MajorTitle from "./MajorTitle";
import Button from "../../components/BasicComponents/Button/Button";

const MajorPreview = ({ majorTitle, universityTitle, rating, majorId }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <MajorTitle
                    majorTitle={majorTitle}
                    universityTitle={universityTitle}
                />
            </div>
            <div className={styles.ratingAndButton}>
                {rating === -1 ? undefined : <MajorRating rating={rating} />}
                <Button
                    buttonType="contained"
                    buttonSize="medium"
                    onClick={() => navigate(`/kierunki/${majorId}`)}
                >
                    Sprawdź{" "}
                </Button>
            </div>
        </div>
    );
};

export default MajorPreview;
