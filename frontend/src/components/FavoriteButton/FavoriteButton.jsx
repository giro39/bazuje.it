import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/components/FavoriteButton/FavoriteButton.module.scss";

export default function FavoriteButton({ userId, kierunkId, onToggle }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId || !kierunkId) return;

        const checkFavorite = async () => {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/favorite/check/",
                    { userId, kierunkId },
                    { headers: { "Content-Type": "application/json" } },
                );
                setIsFavorite(response.data.isFavorite);
            } catch (err) {
                console.error("Błąd przy sprawdzaniu ulubionego:", err);
            }
        };

        checkFavorite();
    }, [userId, kierunkId]);

    const handleToggleFavorite = async () => {
        if (!userId || !kierunkId) {
            alert("Zaloguj się aby dodać do ulubionych");
            return;
        }

        setLoading(true);
        try {
            if (isFavorite) {
                await axios.delete(
                    "http://127.0.0.1:8000/api/favorite/remove/",
                    {
                        data: { userId, kierunkId },
                    },
                );
            } else {
                await axios.post("http://127.0.0.1:8000/api/favorite/add/", {
                    userId,
                    kierunkId,
                });
            }
            setIsFavorite(!isFavorite);
            if (onToggle) {
                onToggle(!isFavorite);
            }
        } catch (err) {
            console.error("Błąd przy zmianie ulubionego:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ""}`}
            onClick={handleToggleFavorite}
            disabled={loading}
            title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        >
            ★
        </button>
    );
}
