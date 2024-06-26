import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from '../../styles/pages/Quiz.module.scss';

// const SERVER_URL = "http://127.0.0.1:8000";

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
    const location = useLocation();
    const navigate = useNavigate();
    const [currentFold, setCurrentFold] = useState(location.pathname.split('/').pop());

    useEffect(() => {
        navigate(`/${currentFold}`);
    }, [currentFold]);

    const handleCategoryClick = (name) => {
        if (selectedCategories.includes(name)) {
            setSelectedCategories(selectedCategories.filter(category => category !== name));
        } else if (selectedCategories.length < 3) {
            setSelectedCategories([...selectedCategories, name]);
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

    const handleConfirmation = () => {
        setCurrentFold('results');
        // fetch(SERVER_URL, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ categories: selectedCategories })
        // })
        // .then(response => {
        //     if (response.ok) {
        //         console.log('Kategorie zostały pomyślnie wysłane');
        //     } else {
        //         console.log('Wystąpił błąd podczas wysyłania kategorii');
        //     }
        // })
        // .catch(error => {
        //     console.log('Wystąpił błąd sieci: ' + error.message);
        // });
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
                        <p className={styles.category}>{cat.title}</p>
                    </div>
                ))}
            </div>
            <button 
                className={styles.confirmButton}
                onClick={handleConfirmation}>
                Zatwierdź
            </button>
        </div>
    );
};

export default Quiz;
