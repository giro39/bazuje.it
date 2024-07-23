import React from "react";

import Button from "../../components/BasicComponents/Button/Button";

import styles from "../../styles/components/BestComment/BestComment.module.scss";

const BestComment = () => {
    return (
        <div className={styles.container}>
            <div className={styles.userSegment}>
                <div className={styles.userImage}>
                    <p className={styles.userFirstLetter}>M</p>
                </div>
                <p className={styles.username}>Marco:</p>
            </div>
            <div className={styles.commentSegment}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
                praesentium enim hic deleniti, itaque ea vero a magni ex fuga
                est neque qui amet voluptates atque, maxime delectus dolores
                aliquid?
            </div>
            <div className={styles.moreSegment}>
                <Button buttonType="contained" buttonSize="medium">
                    więcej
                </Button>
            </div>
        </div>
    );
};

export default BestComment;
