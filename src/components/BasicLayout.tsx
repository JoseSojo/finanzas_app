import React, { ReactNode } from "react"
import { Footer } from "./Footer";

interface BasicLayoutInterface {
    children: ReactNode
}

export const BasicLayotu: React.FC<BasicLayoutInterface> = ({children}) => {
    return(
        <div className='bg-gray-300 min-h-screen'>
            {children}
            <Footer />
        </div>
    );
}
