import React from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import BestComment from "../components/BestComment/BestComment";

import styles from "../styles/pages/Major.module.scss";

const Major = () => {
    const { majorId } = useParams();
    return (
        <>
            <Navbar />
            {majorId}
        </>
    );
};

export default Major;
