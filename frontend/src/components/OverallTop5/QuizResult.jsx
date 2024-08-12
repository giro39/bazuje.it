import { useContext } from "react";
import styles from "../../styles/components/OverallTop5/OverallTop5.module.scss";
import MajorPreview from "../MajorPreview/MajorPreview";

import { ResultContext } from "../../contexts/ResultContext";

const SERVER_URL = "http://127.0.0.1:8000";

const QuizResult = () => {
    const { result, setResult } = useContext(ResultContext);

    return (
        <div className={styles.container}>
            {result.map((kierunek, index) => (
                <div key={index} className={styles.majorPreviewElement}>
                    <MajorPreview
                        majorTitle={kierunek.kierunek}
                        universityTitle={kierunek.uczelnia}
                        // rating={Math.round(kierunek.wynikQuizu)}
                        rating={-1}
                        majorId={kierunek.kierunek_id}
                    />
                </div>
            ))}
        </div>
    );
};

export default QuizResult;
