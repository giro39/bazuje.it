import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const RatingNumber = ({ number }) => {
    const { theme } = useContext(ThemeContext);
    let r, g, b;

    if (theme === "light") {
        r = 30 + (number / 100) * 225;
        g = 136 + (number / 100) * 47;
        b = 229 - (number / 100) * 152;
    } else {
        r = 188 - (number / 100) * 77;
        g = 134 + (number / 100) * 13;
        b = 90 + (number / 100) * 69;
    }

    return <span style={{ color: `rgb(${r},${g},${b})` }}>{number}</span>;
};

export default RatingNumber;
