import { useEffect, useState } from "react";
import styles from "../../../styles/OverallTop5.module.scss";
import MajorPreview from "../MajorPreview/MajorPreview";

const SERVER_URL = "http://127.0.0.1:8000";

const OverallTop5 = ({ flag }) => {
  const [uczelnias, setUczelnias] = useState([]);
  const [chosenMajors, setChosenMajors] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };

    fetch(SERVER_URL + "/api/best_kierunki", requestOptions)
      .then((response) => response.json())
      .then((data) => setUczelnias(data));
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };

    fetch(SERVER_URL + "/api/submit_categories", requestOptions)
      .then((response) => response.json())
      .then((data) => setChosenMajors(data));
  }, []);

  if (flag === 'results') {
    return (
      <div className={styles.container}>
        {chosenMajors.map((kierunek, index) => (
          <div key={index} className={styles.majorPreviewElement}>
            <MajorPreview
              majorTitle={kierunek.kierunek}
              universityTitle={kierunek.uczelnia}
              rating={-1}
            />
            <button className={styles.buttonCheck}>Sprawdź</button>
          </div>
        ))}
      </div>
    );
  } else {
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
};

export default OverallTop5;
