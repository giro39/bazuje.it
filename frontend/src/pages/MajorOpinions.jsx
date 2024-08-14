import MajorPageTopper from "../components/BasicComponents/MajorPageTopper/MajorPageTopper";
import Opinion from "../components/Opinion/Opinion";

import styles from "../styles/pages/MajorOpinions.module.scss";

const MajorOpinions = () => {
    return (
        <div className={styles.container}>
            <MajorPageTopper
                chosenMajor={{
                    kierunek: "Informatyka",
                    uczelnia: "Politechnika Poznańska",
                }}
            />
            <p className={styles.opinionsOfStudents}>Opinie studentów</p>

            <div className={styles.opinionsContainer}>
                <Opinion />
                <Opinion />
                <Opinion />
            </div>
        </div>
    );
};

export default MajorOpinions;
