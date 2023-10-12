import React, { createContext, useState, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { BsBuildingFill } from 'react-icons/bs';

interface billsIncomeInterface {
    ingreso:number,
    egreso: number
}

interface CategorisInterface {
    type:string,
    ico:any,
    category:string
}

interface context {
    cash: number,
    updateCash: Dispatch<SetStateAction<number>>,
    unit: string,
    updateUnit: Dispatch<SetStateAction<string>>,
    ingresoEgreso: billsIncomeInterface,
    updateIngresoEgreso: Dispatch<SetStateAction<billsIncomeInterface>>,
    categoryList: CategorisInterface[],
    updateCategoryList: Dispatch<SetStateAction<CategorisInterface[]>>
}

const basic = {
    ingreso:0,
    egreso:0
}

const basicCategory: CategorisInterface[] = [
    {
        type:'gasto',
        ico: <BsBuildingFill />,
        category: 'Alquiler'
    },
    {
        type:'gasto',
        ico: <BsBuildingFill />,
        category: 'Transporte'
    },
    {
        type:'gasto',
        ico: <BsBuildingFill />,
        category: 'Comida'
    },
    {
        type:'gasto',
        ico: <BsBuildingFill />,
        category: 'Agua'
    },
    {
        type:'ingreso',
        ico: <BsBuildingFill />,
        category: 'Salario'
    },
    {
        type:'ingreso',
        ico: <BsBuildingFill />,
        category: 'Venta'
    }
]

export const CashContext = createContext<context>({
    cash:0,
    updateCash:()=>{},
    unit:'bs',
    updateUnit:()=>{},
    ingresoEgreso:basic, 
    updateIngresoEgreso:()=>{},
    categoryList:basicCategory,
    updateCategoryList:()=>{}
});

export function CashProvider({ children }: {children:React.ReactNode}) {
    const [cash, setCash] = useState(0);
    const [unit, setUnit] = useState('bs');
    const [ingresoEgreso, setIngresoEgreso] = useState<billsIncomeInterface>(basic);
    const [categoryList, setCategoryList] = useState<CategorisInterface[]>(basicCategory) 

    useEffect(()=>{
        const testIngresoEgreso = window.localStorage.getItem('ingresoEgreso');
        const testCash = window.localStorage.getItem('cash');
        if(testIngresoEgreso == null) window.localStorage.setItem('ingresoEgreso', JSON.stringify({'ingreso':0,'egreso':0}));
        if(testCash == null) window.localStorage.setItem('cash', JSON.stringify(0));

        if(testIngresoEgreso != null) setIngresoEgreso(JSON.parse(testIngresoEgreso));
        if(testCash != null) setCash(JSON.parse(testCash))
    }, [])
    

    return (
        <CashContext.Provider value={{
            cash: cash,
            updateCash: setCash,
            unit: unit,
            updateUnit: setUnit,
            ingresoEgreso: ingresoEgreso,
            updateIngresoEgreso: setIngresoEgreso,
            categoryList: categoryList,
            updateCategoryList: setCategoryList
        }}>
            {children}
        </CashContext.Provider>
    )
}

export const useCashContext = ()=> useContext(CashContext)