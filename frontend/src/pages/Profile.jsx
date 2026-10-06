import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/pages/Profile.module.scss";

export default function Profile() {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/user/profile/${userId}/`,
                );
                setProfile(response.data);
                setLoading(false);
            } catch (err) {
                setError("Nie udało się pobrać profilu użytkownika");
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    if (loading) {
        return <div className={styles.loading}>Ładowanie...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!profile) {
        return <div className={styles.notFound}>Profil nie znaleziony</div>;
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <h1 className={styles.username}>{profile.username}</h1>

                <div className={styles.statsGrid}>
                    <div className={styles.statBox}>
                        <div className={styles.statValue}>
                            {profile.liczba_opinii}
                        </div>
                        <div className={styles.statLabel}>Dodane recenzje</div>
                    </div>

                    <div className={styles.statBox}>
                        <div className={styles.statValue}>
                            {profile.srednia_ocena}
                        </div>
                        <div className={styles.statLabel}>Średnia ocena</div>
                    </div>

                    <div className={styles.statBox}>
                        <div className={styles.statValue}>
                            {profile.glosy_ogalem}
                        </div>
                        <div className={styles.statLabel}>Otrzymane głosy</div>
                    </div>
                </div>

                <div className={styles.profileDescription}>
                    <p>
                        Użytkownik ma <strong>{profile.liczba_opinii}</strong>{" "}
                        recenzji ze średnią oceną{" "}
                        <strong>{profile.srednia_ocena}/100</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}
