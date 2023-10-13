import React, { ReactNode } from "react"
import { Footer } from "./Footer";

interface BasicLayoutInterface {
    children: ReactNode,
    title: string
}

export const BasicLayotu: React.FC<BasicLayoutInterface> = ({children, title}) => {
    return(
        <div className='bg-gray-300 min-h-screen'>
            <h2 className='text-center text-3xl font-thin font-mono py-3'>{title}</h2>
            {children}
            <Footer />
        </div>
    );
}
