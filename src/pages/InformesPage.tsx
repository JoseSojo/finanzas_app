import { useState } from "react";
import { BasicLayotu } from "../components/BasicLayout";
import { CardBasic } from "../components/CardBasic";
import { useCashContext } from "../context/CashContext";

export default function Informes () {
    interface DataInterface {
        type:string|null,
        concep:string,
        mount:number
    }
    const [tranState] = useState<DataInterface[] | null>(
        JSON.parse(`${window.localStorage.getItem('transactions')}`)
    );
    const cashCnxt = useCashContext();

    return(
        <BasicLayotu title='Informes'>
            {
                tranState == null 
                ? <>
                    <main className='flex justify-center items-center w-[90%] mx-auto pt-10'>
                        <CardBasic cls='flex justify-center items-center p-5'>
                            <p className='text-xl font-bolf font-mono text-gray-700 text-center'>No tienes Transacciones registradas</p>
                        </CardBasic>
                    </main>
                </>
                : <>
                    <main className='grid gap-y-1 px-3 pt-5 w-full md:w-[50%] mx-auto'>
                        <CardBasic cls='grid grid-cols-3 py-3 text-center place-items-center mx-auto '>
                            <p className='text-gray-700 text-xl font-bold font-mono'>Tipo</p>
                            <p className='text-gray-700 text-xl font-bold font-mono '>Concepto</p>
                            <p className='text-gray-700 text-xl font-bold font-mono'>Monto</p>
                        </CardBasic>
                        {
                            tranState.map((item, i) => (
                                <CardBasic key={i} cls='grid grid-cols-3 py-3 text-center place-items-center'>
                                    <p
                                        className={`
                                            ${item.type == 'ingreso' ? 'text-green-500' : 'text-red-500' }
                                            font-bold font-mono
                                        `}
                                        >{item.type?.toUpperCase()}</p>
                                    <p className='font-mono text-gray-700 text-lg'>{item.concep}</p>
                                    <p className='text-gray-600 font-bold font-mono'>{item.mount} {cashCnxt.unit}</p>
                                </CardBasic>
                            ))
                        }
                    </main>
                </>
            }
        </BasicLayotu>
    );
}