import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

import styles from "../../styles/components/OverallTop5/OverallTop5.module.scss";
import MajorPreview from "../MajorPreview/MajorPreview";

const SERVER_URL = "http://127.0.0.1:8000";

const OverallTop5 = () => {
    const { data, loading, error } = useFetch(
        `${SERVER_URL}/api/best_kierunki/`
    );

    if (loading) return <div className={styles.container}></div>;

    if (error)
        return <div className={styles.container}>Błąd pozyskania danych.</div>;

    return (
        <div className={styles.container}>
            {data &&
                data.map((kierunek, index) => (
                    <div key={index} className={styles.majorPreviewElement}>
                        <MajorPreview
                            majorTitle={kierunek.kierunek}
                            universityTitle={kierunek.uczelnia}
                            rating={Math.round(kierunek.sredniaOcen)}
                        />
                        <Link to={`/kierunki/${kierunek.kierunek_id}`}>
                            <button className={styles.buttonCheck}>
                                Sprawdź
                            </button>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default OverallTop5;
