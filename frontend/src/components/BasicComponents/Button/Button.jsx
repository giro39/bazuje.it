import styles from "../../../styles/components/BasicComponents/Button/Button.module.scss";

const Button = ({ onClick, buttonType, buttonSize, children, ...rest }) => {
    let buttonTypeClass = "";
    let buttonSizeClass = "";

    if (
        buttonType === "contained" ||
        buttonType === "outlined" ||
        buttonType === "distinctive" ||
        buttonType === "white"
    ) {
        buttonTypeClass = buttonType;
    }

    if (
        buttonSize === "small" ||
        buttonSize === "medium" ||
        buttonSize === "large" ||
        buttonSize === "giant"
    ) {
        buttonSizeClass = buttonSize;
    }

    let buttonClass = `${styles[buttonTypeClass]} ${styles[buttonSizeClass]}`;

    return (
        <button className={buttonClass} onClick={onClick} {...rest}>
            {children}
        </button>
    );
};

export default Button;
