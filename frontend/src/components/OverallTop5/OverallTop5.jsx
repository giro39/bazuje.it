import { useEffect, useState } from "react";
import styles from "../../../styles/OverallTop5.module.scss";
import MajorPreview from "../MajorPreview/MajorPreview";

const SERVER_URL = "http://127.0.0.1:8000";

const OverallTop5 = () => {
  const [uczelnias, setUczelnias] = useState([]);

  useEffect(() => {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      };

      fetch(SERVER_URL + "/api/bestkierunki", requestOptions)
        .then((response) => response.json())
        .then((newNotes) => setUczelnias(newNotes));
  }, []);

  return (
    <div className={styles.container}>
        {uczelnias.map((kierunek) => (
        <MajorPreview key={kierunek[0]}
        majorTitle={kierunek[0]}
        universityTitle={kierunek[2]}
        rating={Math.round(kierunek[1])}
      />
      ))}
    </div>
  );
};

export default OverallTop5;
