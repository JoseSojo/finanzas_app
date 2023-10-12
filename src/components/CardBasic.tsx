import React, { ReactNode } from "react"

interface CardBasicProps {
    children: ReactNode,
    cls: string
}

export const CardBasic: React.FC<CardBasicProps> = ({children, cls}) => {
    return (
        <div className={`w-full h-auto rounded-lg bg-gray-50 shadow shadow-gray-300 ${cls}`}>
            {children}
        </div>
    );
}