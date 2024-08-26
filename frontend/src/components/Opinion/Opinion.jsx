import { useEffect, useState } from "react";
import styles from "../../styles/components/Opinion/Opinion.module.scss";
import Button from "../BasicComponents/Button/Button";
import Rating from "./Rating";
import UserTag from "./UserTag";

const Opinion = ({ opinion }) => {
    const [isLarge, setIsLarge] = useState(false);
    const [isContained, setIsContained] = useState(true);

    const maxSizeOfText = 750;

    const fullTxt = `dolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Loremdolores perferendis magnam id nobis exercitationem? Illum
                        Lorem ipsum`;
    const croppedTxt = fullTxt.slice(0, maxSizeOfText) + "...";

    useEffect(() => {
        if (fullTxt.length > maxSizeOfText) {
            setIsLarge(true);
        }
    }, [fullTxt]);

    function changeContainer() {
        setIsContained((prevState) => !prevState);
    }

    return (
        <div className={`${styles.container}`}>
            <UserTag user="Giro" />
            <div>
                <div className={styles.opinionText}>
                    {isLarge ? (isContained ? croppedTxt : fullTxt) : fullTxt}
                </div>
                {isLarge && (
                    <div className={styles.buttonPlace}>
                        <Button
                            onClick={changeContainer}
                            buttonType={"inlined"}
                            buttonSize={"inlineSize"}
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
