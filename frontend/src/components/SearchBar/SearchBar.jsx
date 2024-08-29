import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

import styles from "../../styles/components/SearchBar/SearchBar.module.scss";

const SERVER_URL = "http://127.0.0.1:8000";

const dataTemplate = [
    {
        id: 1,
        major: "Informatyka",
        university: "Politechnika Poznańska",
        location: "Poznań",
    },
    {
        id: 2,
        major: "Bioinformatyka",
        university: "Politechnika Poznańska",
        location: "Poznań",
    },
    {
        id: 3,
        major: "Informatyka",
        university: "Politechnika Gdańska",
        location: "Gdańsk",
    },
    {
        id: 4,
        major: "Informatyka",
        university: "Akademia Nauk Stosowanych w Pile",
        location: "Piła",
    },
    {
        id: 5,
        major: "Sztuczna Inteligencja",
        university: "Politechnika Poznańska",
        location: "Poznań",
    },
    {
        id: 6,
        major: "Bioinformatyka",
        university: "Akademia Nauk Stosowanych w Pile",
        location: "Piła",
    },
    {
        id: 6,
        major: "Informatyka",
        university: "Politechnika Bydgoska",
        location: "Bydgoszcz",
    },
];

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length > 1) {
            const filteredResults = data
                .filter(
                    (item) =>
                        item.majorName
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        item.universityName
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        item.location
                            .toLowerCase()
                            .includes(query.toLowerCase())
                )
                .slice(0, 8);
            setResults(filteredResults);
        } else {
            setResults([]);
        }
        console.log(results);
    }, [query]);

    const { data, loading, error } = useFetch(`${SERVER_URL}/api/all_majors/`);

    if (loading) return <div className={styles.container}></div>;

    if (error)
        return <div className={styles.container}>Błąd pozyskania danych.</div>;

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                type="search"
                placeholder="Wyszukaj uczelnię lub kierunek..."
                value={query}
                onChange={handleQueryChange}
            />
            {results.length > 0 && (
                <ul className={styles.dropdown}>
                    {results.map((result) => (
                        <li key={result.id} className={styles.dropdownItem}>
                            <div className={styles.itemContent}>
                                <b>{result.majorName}</b>
                                <p>
                                    {result.universityName}, {result.location}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
