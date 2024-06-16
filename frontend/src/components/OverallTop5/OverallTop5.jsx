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

      fetch(SERVER_URL + "/api/bestkierunki", requestOptions)
        .then((response) => response.json())
        .then((newNotes) => setUczelnias(newNotes));
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };

    fetch(SERVER_URL + "/api/wynikquizu", requestOptions)
      .then((response) => response.json())
      .then((newNotes) => setChosenMajors(newNotes));
}, []);

  if (flag === 'results') {
    return (
      <div className={styles.container}>
          {chosenMajors.map((kierunek) => (
            <div className={styles.majorPreviewElement}>
              <MajorPreview key={kierunek[1] + kierunek[2]}
                majorTitle={kierunek[1]}
                universityTitle={kierunek[2]}
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
          {uczelnias.map((kierunek) => (
            <div className={styles.majorPreviewElement}>
              <MajorPreview key={kierunek[0]}
                majorTitle={kierunek[0]}
                universityTitle={kierunek[2]}
                rating={Math.round(kierunek[1])}
              />
              <button className={styles.buttonCheck}>Sprawdź</button>
            </div>  
          ))}
      </div>
    );
  }
};

export default OverallTop5;
