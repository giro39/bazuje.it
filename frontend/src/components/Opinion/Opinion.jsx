import { useEffect, useRef, useState } from "react";
import styles from "../../styles/components/Opinion/Opinion.module.scss";
import Button from "../BasicComponents/Button/Button";
import Rating from "./Rating";
import UserTag from "./UserTag";

const Opinion = ({ opinion }) => {
    const [isContained, setIsContained] = useState(true);
    const opinionRef = useRef(null);
    const largeText = useRef(false);

    const MaxREMTextSize = 8;
    const maxLINESOfText = 5;

    const txt = `dolores perferendis magnam id nobis exercitationem? Illum
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    assume dolores perferendis magnam id nobis exercitationem?
                    dolores perferen dis magnam id nobis exercitationem? Illum
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    assume dolores perferendis magnam id nobis exercitationem?
                    dolores perferendis magnam id nobis exercitationem? Illum
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    HicLorem ipsum dolor sit amet consectetur adipisicing elit.
                    HicLorem dddddddddddddddddddddddddddddd`;

    useEffect(() => {
        if (opinionRef.current) {
            // USUNAC JAK JUZ BEDZIE POSTANOWIONE
            //const containerHeight = opinionRef.current.offsetHeight;
            //const rootFontSize = parseFloat(
            //    getComputedStyle(document.documentElement).fontSize
            //);
            //const threshold = MaxREMTextSize * rootFontSize;
            //largeText.current = containerHeight >= threshold;
            console.log(txt.length);
            largeText.current = txt.length > 750;

            /*             const computedStyle = getComputedStyle(opinionRef.current);
            let lineHeight = parseFloat(computedStyle.lineHeight);

            console.log(lineHeight);
            if (isNaN(lineHeight)) {
                const fontSize = parseFloat(computedStyle.fontSize);
                lineHeight = fontSize * 1.2; // Zakładamy, że line-height wynosi 1.2 em
            }
            // Oblicz wysokość odpowiadającą 5 liniom tekstu
            const maxLinesHeight = lineHeight * maxLINESOfText;

            const containerHeight = opinionRef.current.offsetHeight;

            console.log(maxLinesHeight, containerHeight);
            largeText.current = containerHeight >= maxLinesHeight;
 */
        }
    }, [txt]);

    function changeContainer() {
        setIsContained((prevState) => !prevState);
    }

    return (
        <div
            className={`${styles.container} ${
                isContained ? styles.contained : ""
            } ${largeText.current ? "" : styles.smallText}`}
        >
            <UserTag user="Giro" />
            <div>
                <div className={styles.opinionText} ref={opinionRef}>
                    {txt}
                </div>
                {largeText.current && (
                    <div className={styles.buttonPlace}>
                        <Button
                            onClick={changeContainer}
                            buttonType={"outlined"}
                            buttonSize={"medium"}
                        >
                            {isContained ? "czytaj więcej" : "czytaj mniej"}
                        </Button>
                    </div>
                )}
            </div>
            <Rating rating={4} />
        </div>
    );
};

export default Opinion;
