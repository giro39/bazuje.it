import { createPortal } from "react-dom";

const AddOpinion = () => {
    return createPortal(<p>Test</p>, document.getElementById("overlay"));
};

export default AddOpinion;
