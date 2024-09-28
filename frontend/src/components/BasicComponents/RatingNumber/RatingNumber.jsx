import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const RatingNumber = ({ number }) => {
    const { theme } = useContext(ThemeContext);


    let r, g, b;
    let negativeColor = [];
    let positiveColor = [];
    if (theme === "light") {
        negativeColor = [30, 136, 229];
        positiveColor = [255, 183, 77];
    } else {
        negativeColor = [188, 134, 90];
        positiveColor = [111, 147, 159];

    }

    r = negativeColor[0] + (number / 100) * (positiveColor[0] - negativeColor[0]);
    g = negativeColor[1] + (number / 100) * (positiveColor[1] - negativeColor[1]);
    b = negativeColor[2] + (number / 100) * (positiveColor[2] - negativeColor[2]);


    return <span style={{ color: `rgb(${r},${g},${b})` }}>{number}</span>;
};

export default RatingNumber;
