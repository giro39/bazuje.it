import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/pages/Favorites.module.scss";

export default function Favorites() {
    const { userId } = useParams();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/favorites/${userId}/`,
                );
                setFavorites(response.data);
                setLoading(false);
            } catch (err) {
                setError("Nie udało się pobrać ulubionych kierunków");
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [userId]);

    const handleRemoveFavorite = (kierunkId) => {
        setFavorites((prev) =>
            prev.filter((fav) => fav.kierunek_id !== kierunkId),
        );
    };

    if (loading) {
        return <div className={styles.loading}>Ładowanie...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.favoritesContainer}>
            <h1 className={styles.title}>Moje ulubione kierunki</h1>

            {favorites.length === 0 ? (
                <div className={styles.empty}>
                    <p>Nie masz jeszcze żadnych ulubionych kierunków</p>
                </div>
            ) : (
                <div className={styles.favoritesGrid}>
                    {favorites.map((fav) => (
                        <div
                            key={fav.kierunek_id}
                            className={styles.favoriteCard}
                        >
                            <div className={styles.cardHeader}>
                                <h3 className={styles.majorName}>
                                    {fav.kierunek_nazwa}
                                </h3>
                                <button
                                    className={styles.removeBtn}
                                    onClick={() =>
                                        handleRemoveFavorite(fav.kierunek_id)
                                    }
                                >
                                    ✕
                                </button>
                            </div>
                            <div className={styles.cardInfo}>
                                <p className={styles.university}>
                                    {fav.uczelnia_nazwa}
                                </p>
                                <p className={styles.location}>{fav.miasto}</p>
                            </div>
                            <div className={styles.timestamp}>
                                Dodane:{" "}
                                {new Date(fav.dodane).toLocaleDateString(
                                    "pl-PL",
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
