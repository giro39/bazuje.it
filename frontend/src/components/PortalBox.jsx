import React, { useContext, forwardRef, useEffect } from "react";
import { createPortal } from "react-dom";

import { PortalBoxContext } from "../contexts/PortalBoxContext";

const PortalBox = ({ children }) => {
    const ref = useContext(PortalBoxContext);

    useEffect(() => {}, [ref]);

    return ref ? createPortal(<>{children}</>, ref) : <></>;
};

export const PortalBoxParent = forwardRef(({ children }, ref) => (
    <div ref={ref}>{children}</div>
));
// className={`${styles.customModuleContainer}`}
export default PortalBox;
