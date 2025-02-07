import {React} from 'react'
import { Icons } from '../constants/Icons'

const EmptyElements=({text})=>{
    return (
        <div className='size-full total-center flex flex-col gap-3 text-center'>
            <Icons.Empty className='size-12 text-orange-300'/>
            {text ? <p className='text-[20px]'>{text}</p>:
             <p className='text-[20px] '>¡Uuups. No se tiene elementos <br/>que coincidan con lo solicitado!</p>}
        </div>
    )
}

export default EmptyElements