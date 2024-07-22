import { useEffect, useState } from "react";
import styles from "../../styles/components/OverallTop5/OverallTop5.module.scss";
import MajorPreview from "../MajorPreview/MajorPreview";

const SERVER_URL = "http://127.0.0.1";

const OverallTop5 = ({ flag }) => {
  const [uczelnias, setUczelnias] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        fetch(SERVER_URL + "/api/best_kierunki", requestOptions)
            .then((response) => response.json())
            .then((data) => setUczelnias(data));
    }, []);

  return (
    <div className={styles.container}>
      {uczelnias.map((kierunek, index) => (
        <div key={index} className={styles.majorPreviewElement}>
          <MajorPreview
            majorTitle={kierunek.kierunek}
            universityTitle={kierunek.uczelnia}
            rating={Math.round(kierunek.sredniaOcen)}
          />
          <button className={styles.buttonCheck}>Sprawdź</button>
        </div>
      ))}
    </div>
  );
}

export default OverallTop5;
