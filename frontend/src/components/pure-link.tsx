import React from "react";

import {Link} from "react-router-dom";

export const PureLink: React.FC<{
    to: string;
    children: React.ReactNode;
    style?: object;
}> = ({to, children, style}) => {
    return (
        <Link to={to} style={{...(style ?? {}   ), textDecoration: "none", color: "inherit"}}>{children}</Link>
    );
}
