import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { BasicLayotu } from "../components/BasicLayout";
import { CardBasic } from "../components/CardBasic";
import { useCashContext } from "../context/CashContext";
import { BsPenFill, BsPlus } from 'react-icons/bs';
import { useState } from "react";
import { ModalForm } from "../components/ModalForm";

export default function Transaction () {
    const cashContext = useCashContext();
    const [modal, setModal] = useState(false);


    return(
        <BasicLayotu>
            {modal && <ModalForm close={setModal} /> }
            <main className='grid md:grid-cols-2 gap-5 p-5'>
                <CardBasic cls='grid place-items-center'>
                    <div className='border-b-2 w-full text-center py-4 grid'>
                        <span className='text-ellipsis text-gray-700'>Saldo disponible</span>
                        <span className='text-4xl font-mono font-bold text-gray-800'>{cashContext.cash} {cashContext.unit}</span>
                    </div>
                    <div className='text-xl text-gray-700 hover:text-gray-950 transition-all flex py-2 items-center gap-3'>
                        <BsPenFill /> Gestionar Cuentas.
                    </div>
                </CardBasic>

                <CardBasic cls='grid grid-cols-2 py-3'>
                    <div className='grid grid-cols-2'>
                        <span className='text-3xl flex justify-center items-center text-green-700'><FiArrowUp /></span>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-lg text-gray-600'>Ingresos</p>
                            <span className='font-mono font-bold text-green-700'>{cashContext.ingresoEgreso.ingreso}</span>
                        </div>
                    </div>
                    <div className='grid grid-cols-2'>
                        <span className='text-3xl flex justify-center items-center text-red-700'><FiArrowDown /></span>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-lg text-gray-600'>Gastos</p>
                            <span className='font-mono font-bold text-red-700'>{cashContext.ingresoEgreso.egreso}</span>
                        </div>
                    </div>
                </CardBasic>
            </main>
            <button 
                onClick={()=>{setModal(!modal)}}
                className='w-12 h-12 absolute bottom-16 right-2 bg-orange-600 hover:bg-orange-700 rounded-md flex justify-center items-center text-gray-50 text-4xl'
                >
                <BsPlus />
            </button>
        </BasicLayotu>
    );
}