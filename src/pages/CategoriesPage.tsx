import { useState } from "react";
import { BasicLayotu } from "../components/BasicLayout";
import { CardBasic } from "../components/CardBasic";
import { useCashContext } from "../context/CashContext";

export default function Categories () {
    const [cap, setCap] = useState<null|string>(null);
    const cashContext = useCashContext()

    return(
        <BasicLayotu>
            <div className="grid gap-y-5 p-5">
                <CardBasic cls='flex'>
                    <button 
                        className='flex-1 p-5 text-center hover:bg-gray-100 rounded-l-md'
                        onClick={()=>setCap('ingreso')}
                        >
                        Ingresos
                    </button>
                    <button 
                        className='flex-1 p-5 text-center hover:bg-gray-100 rounded-r-md'
                        onClick={()=>setCap('gasto')}
                        >
                        Gastos
                    </button>
                </CardBasic>
                {
                    cap && <CardBasic cls='grid gap-y-4'>
                        <h3 className='text-xl text-center font-semibold text-gray-600 py-3'>{cap}</h3>
                        <ul className='grid'>
                            {
                                cashContext.categoryList.map((category, i) => (
                                    category.type == cap 
                                    ? <li key={i} className='list-none text-center font-mono py-2 flex justify-center items-center'>
                                        <span>{category.category}</span>
                                    </li>
                                    : null
                                ))
                            }
                        </ul>
                    </CardBasic>
                }
            </div>
        </BasicLayotu>
    );
}