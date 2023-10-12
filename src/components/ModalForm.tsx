import React, { Dispatch, SetStateAction, useState } from "react"
import { CardBasic } from "./CardBasic"
import { useCashContext } from "../context/CashContext"

interface ModalFormProps {
    close: Dispatch<SetStateAction<boolean>>
}


export const ModalForm: React.FC<ModalFormProps> = ({close}) => {
    interface DataInterface {
        type:string|null,
        concep:string,
        mount:number
    }

    const basic:DataInterface = {
        type:null,
        concep:'',
        mount:0
    }

    const [data, setData] = useState<DataInterface>(basic);
    const cashContext = useCashContext();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newData = {
            ...data,
            [event.target.name]: event.target.value
        }    
        setData(newData);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const storage = window.localStorage.getItem('transactions');

        const note = parseInt(`${cashContext.cash}`) + parseInt(`${data.mount}`);
        if (storage !== null) {
            const d = JSON.parse(storage);
            d.push(data);
            window.localStorage.setItem('transactions', JSON.stringify(d)); // load storage

            let clone = cashContext.ingresoEgreso;
            if(data.type == 'ingreso') {
                const obj = {
                    ingreso: parseInt(`${cashContext.ingresoEgreso.ingreso}`) + parseInt(`${data.mount}`),
                    egreso:cashContext.ingresoEgreso.egreso
                }
                cashContext.updateCash(note);
                clone.ingreso += parseInt(`${data.mount}`);
                window.localStorage.setItem('cash', JSON.stringify(note));
                window.localStorage.setItem('ingresoEgreso', JSON.stringify(obj));
            }
            
            if(data.type == 'gasto') {
                const obj = {
                    ingreso: cashContext.ingresoEgreso.ingreso,
                    egreso: parseInt(`${cashContext.ingresoEgreso.egreso}`) + parseInt(`${data.mount}`)
                }
                cashContext.updateCash(cashContext.cash - data.mount);
                clone.egreso += parseInt(`${data.mount}`);
                window.localStorage.setItem('cash', JSON.stringify(cashContext.cash - data.mount));
                window.localStorage.setItem('ingresoEgreso', JSON.stringify(obj));
            }

            

        } else {
            window.localStorage.setItem('transactions', JSON.stringify([data]));
            let clone = cashContext.ingresoEgreso;
            if(data.type == 'ingreso') cashContext.updateCash(note)
            if(data.type == 'ingreso') clone.ingreso += parseInt(`${data.mount}`);
            if(data.type == 'ingreso') window.localStorage.setItem('cash', JSON.stringify(note));
            
            if(data.type == 'gasto') cashContext.updateCash(cashContext.cash - data.mount)
            if(data.type == 'gasto') clone.egreso += parseInt(`${data.mount}`);
            if(data.type == 'gasto') window.localStorage.setItem('cash', JSON.stringify(cashContext.cash - data.mount));

            window.localStorage.setItem('cash', JSON.stringify(note));
        }

        close(false);
    }

    return (
        <div className='absolute z-50 min-h-screen w-full bg-gray-950 bg-opacity-50 flex justify-center items-center'>
            <CardBasic cls='mx-10 py-5'>
                <form onSubmit={handleSubmit}>
                    <h3 className='font-mono text-xl text-center text-gray-600'>Transsacción</h3>
                    <div className='flex justify-center items-center mt-4 gap-x-10'>
                        <label className='text-md'>
                            Ingreso 
                            <input onChange={handleChange} type="radio" name="type" id="" value='ingreso' />
                        </label>
                        <label className='text-md'>
                            Gasto 
                            <input onChange={handleChange} type="radio" name="type" id="" value='gasto' />
                        </label>
                    </div>
                    <div className='flex justify-center items-center flex-col mt-4 gap-y-3'>
                        <input onChange={handleChange} type='text' name='concep' placeholder='Concepto' className='bg-gray-200 focus:bg-gray-300 focus:outline-none rounded-md py-3 px-4 w-[80%]' />
                        <input onChange={handleChange} type='number' name='mount' placeholder='Cantidad' className='bg-gray-200 focus:bg-gray-300 focus:outline-none rounded-md py-3 px-4 w-[80%]' />
                        {
                            data.type != null && 
                            <select onChange={handleChange} name='category' className='bg-gray-200 focus:bg-gray-300 focus:outline-none rounded-md py-3 px-4 w-[80%]'>
                                {
                                    cashContext.categoryList.map((item, i) => (
                                        item.type == data.type
                                        ? <option key={i} value={item.category}>{item.category}</option>
                                        : null
                                    ))
                                }
                            </select>
                        }
                        <input type='submit' className='py-3 w-[50%] text-center bg-orange-500 hover:bg-orange-600 rounded-md font-bold text-gray-50' value='Guardar Transacción' />
                    </div>
                </form>
            </CardBasic>
            
        </div>
    )
}
