import React, { useState } from 'react';

import styles from '../../styles/pages/Quiz.module.scss';

const categories = [
    {
        title: "Bazy danych",
        name: "bazy",
    },
    {
        title: "Sieci komputerowe",
        name: "sieci",
    },
    {
        title: "Algorytmika",
        name: "algorytmika",
    },
    {
        title: "Sztuczna Inteligencja",
        name: "si",
    },
    {
        title: "Gamedev",
        name: "gamedev",
    },
    {
        title: "Webdev",
        name: "webdev",
    },
    {
        title: "Programowanie mobilne",
        name: "mobilne",
    },
    {
        title: "Cyberbezpieczeństwo",
        name: "cyberbezpieczenstwo",
    }
]

const Quiz = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryClick = (name) => {
        if (selectedCategories.includes(name)) {
            setSelectedCategories(selectedCategories.filter(categorie => categorie !== name));
        } else if (selectedCategories.length < 3) {
            setSelectedCategories([...selectedCategories, name]);
        } else if (selectedCategories.length >= 3) {
            console.log("Tutaj będzie oddisable'owanie buttona do zatwierdzenia");
        }
    };

    const getCategoryStyle = (name) => {
        const index = selectedCategories.indexOf(name);
        switch(index) {
            case 0:
                return styles.firstSelected;
            case 1:
                return styles.secondSelected;
            case 2:
                return styles.thirdSelected;
            default:
                return '';
        };
    };

    return (
        <div className={styles.container}>
            <p className={styles.headerText}>Zaznacz 3 kategorie, które najbardziej <span className={styles.textGradient}>Cię</span> interesują.</p>
            <p className={styles.smallerText}>Kolejność zaznaczania ma znaczenie!</p>
            <div className={styles.categories}>
                {categories.map((cat) => (
                    <div 
                        className={`${styles.categoriesElement} ${getCategoryStyle(cat.name)}`}
                        onClick={() => handleCategoryClick(cat.name)}>
                        <p className={styles.categorie}>{cat.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Quiz;