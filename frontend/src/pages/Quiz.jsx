import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/BasicComponents/Button/Button";
import styles from "../styles/pages/Quiz.module.scss";

import { ResultContext } from "../contexts/ResultContext";

const SERVER_URL = "http://127.0.0.1:8000/api/submit_categories/";

const categories = [
    { title: "Bazy danych", name: "bazy" },
    { title: "Sieci komputerowe", name: "sieci" },
    { title: "Algorytmika", name: "algorytmika" },
    { title: "Sztuczna Inteligencja", name: "si" },
    { title: "Gamedev", name: "gamedev" },
    { title: "Webdev", name: "webdev" },
    { title: "Programowanie mobilne", name: "mobilne" },
    { title: "Cyberbezpieczeństwo", name: "cyberbezpieczenstwo" },
];

const Quiz = () => {
    const { result, setResult } = useContext(ResultContext);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [currentFold, setCurrentFold] = useState(
        location.pathname.split("/").pop()
    );

    useEffect(() => {
        navigate(`/${currentFold}`);
    }, [currentFold, navigate]);

    const handleCategoryClick = (name) => {
        if (selectedCategories.includes(name)) {
            setSelectedCategories(
                selectedCategories.filter((category) => category !== name)
            );
        } else if (selectedCategories.length < 3) {
            setSelectedCategories([...selectedCategories, name]);
        }
    };

    const getCategoryStyle = (name) => {
        const index = selectedCategories.indexOf(name);
        switch (index) {
            case 0:
                return styles.firstSelected;
            case 1:
                return styles.secondSelected;
            case 2:
                return styles.thirdSelected;
            default:
                return "";
        }
    };

    const handleConfirmation = () => {
        axios
            .post(
                SERVER_URL,
                selectedCategories.map((name) => {
                    const category = categories.find(
                        (cat) => cat.name === name
                    );
                    return { title: category.title, name: category.name };
                })
            )
            .then((response) => {
                setResult(response.data);

                setCurrentFold("results");
            })
            .catch((error) => {
                console.error(
                    "There was an error submitting the categories!",
                    error
                );
            });
    };

    return (
        <div className={styles.container}>
            <p className={styles.headerText}>
                Zaznacz 3 kategorie, które najbardziej{" "}
                <span className={styles.textGradient}>Cię</span> interesują.
            </p>
            <p className={styles.smallerText}>
                Kolejność zaznaczania ma znaczenie!
            </p>
            <div className={styles.categories}>
                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        className={`${
                            styles.categoriesElement
                        } ${getCategoryStyle(cat.name)}`}
                        onClick={() => handleCategoryClick(cat.name)}
                    >
                        <p className={styles.category}>{cat.title}</p>
                    </div>
                ))}
            </div>
            <Button
                buttonType="contained"
                buttonSize="large"
                onClick={handleConfirmation}
            >
                Zatwierdź
            </Button>
        </div>
    );
};

export default Quiz;
