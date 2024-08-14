import { useState } from "react";
import styles from "../../styles/components/Opinion/Opinion.module.scss";
import Button from "../BasicComponents/Button/Button";
import Rating from "./Rating";
import UserTag from "./UserTag";

const Opinion = ({ opinion }) => {
    const [isContained, setIsContained] = useState(true);

    let opinionClass = "";
    isContained
        ? (opinionClass = `${styles.container} ${styles.contained}`)
        : (opinionClass = `${styles.container}`);

    function changeContainer() {
        setIsContained((prevState) => !prevState);
    }

    return (
        <div className={opinionClass}>
            <UserTag user="Giro" />
            <span className={styles.opinionText}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                assumenda, suscipit omnis, unde, rerum enim blanditiis dolores
                perferendis magnam id nobis exercitationem? Illum sequi earum
                laboriosam odit molestias ex amet! Lorem ipsum dolor sit ametum
                sequi earum laboriosam odit molestias ex amet! Lorem ipsum dolor
                sit ametum sequi earum laboriosam odit molestias ex amet! Lorem
                ipsum dolor sit ametum sequi earum laboriosam odit molestias ex
                amet! Lorem ipsum dolor sit ametum sequi earum laboriosam odit
                molestias ex amet! Lorem ipsum dolor sit ametum sequi earum
                laboriosam odit molestias ex amet! Lorem ipsum dolor sit ametum
                sequi earum laboriosam odit molestias ex amet! Lorem ipsum dolor
                sit ametum sequi earum laboriosam odit molestias ex amet! Lorem
                ipsum dolor sit ametum sequi earum laboriosam odit molestias ex
                amet! Lorem ipsum dolor sit amet
                {isContained ? (
                    <div className={styles.buttonPlace}>
                        <Button
                            onClick={changeContainer}
                            buttonType={"outlined"}
                            buttonSize={"medium"}
                        >
                            czytaj więcej
                        </Button>
                    </div>
                ) : (
                    <div className={styles.buttonPlace}>
                        <Button
                            onClick={changeContainer}
                            buttonType={"outlined"}
                            buttonSize={"medium"}
                        >
                            czytaj mniej
                        </Button>
                    </div>
                )}
            </span>
            <Rating rating={4} />
        </div>
    );
};

export default Opinion;
