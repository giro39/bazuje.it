import { useEffect, useState } from "react";
import styles from "../../styles/components/OverallTop5/OverallTop5.module.scss";
import MajorPreview from "../MajorPreview/MajorPreview";

const QuizResult = () => {
    const [result, setResult] = useState([]);

    useEffect(() => {
        const storedResult = localStorage.getItem("quizResult");

        if (storedResult) {
            setResult(JSON.parse(storedResult));
        }
    }, []);

    return (
        <div className={styles.container}>
            {result.length > 0 ? (
                result.map((kierunek, index) => (
                    <div key={index} className={styles.majorPreviewElement}>
                        <MajorPreview
                            majorTitle={kierunek.kierunek}
                            universityTitle={kierunek.uczelnia}
                            rating={-1}
                            majorId={kierunek.kierunek_id}
                        />
                    </div>
                ))
            ) : (
                <p>Brak wyników do wyświetlenia.</p>
            )}
        </div>
    );
};

export default QuizResult;
