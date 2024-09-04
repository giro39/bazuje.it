import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

import styles from "../../styles/components/SearchBar/SearchBar.module.scss";

const SERVER_URL = "http://127.0.0.1:8000";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [dropdownActive, setDropdownActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length > 1) {
            setDropdownActive(true);
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
            setDropdownActive(false);
            setResults([]);
        }
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
                className={`${styles.input} ${
                    dropdownActive ? styles.inputActive : ""
                }`}
                type="search"
                placeholder="Wyszukaj uczelnię lub kierunek..."
                value={query}
                onChange={handleQueryChange}
            />
            {results.length > 0 && (
                <ul className={styles.dropdown}>
                    {results.map((result) => (
                        <li
                            key={result.majorId}
                            className={styles.dropdownItem}
                            onClick={() => {
                                navigate(`/kierunki/${result.majorId}`);
                                setQuery("");
                            }}
                        >
                            <div className={styles.itemContent}>
                                <b className={styles.majorName}>
                                    {result.majorName}
                                </b>
                                <p>
                                    <span className={styles.universityName}>
                                        {result.universityName}
                                    </span>
                                    , {result.location}
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
