import React from 'react';

export const PageHeader: React.FC<{ children: React.ReactNode }> = ({ children}) => {
    return <div className={"page-header"}>{children}</div>;
}
