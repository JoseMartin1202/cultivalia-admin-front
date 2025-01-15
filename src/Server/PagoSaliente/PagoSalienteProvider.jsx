import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useState } from 'react';

const usePagoSaliente=(id)=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();
    const [idInv,setID]= useState()
    const [nombreInv,setNombre]= useState()
    const [apellidosInv,setApellidos]= useState()

    /**Functions */
    const updatePago = async (values) => {
        if(id){
            const idI=values.inversorId
            const nombreI=values.inversorNombre
            const apellidosI=values.inversorApellidos
            setApellidos(apellidosI)
            setNombre(nombreI)
            setID(idI)
            delete values.inversorId
            delete values.inversorNombre
            delete values.inversorApellidos
            const formData = new FormData()
            Object.keys(values).forEach(key => {
                if (values[key] === null || values[key] === undefined) { return; }
                    formData.append(key, values[key]);
            })
            for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
            }
            const data=await myAxios.patch(`pagosaliente/${id}/`,formData);
            return data.data;
        }
    }

    /**Querys */
    const PagosMutator = useMutation({
        mutationFn: updatePago,
        onSuccess: (newPago) => {
            newPago={
                ...newPago,
                inversor:{
                    id:idInv,
                    nombre:nombreInv,
                    apellidos:apellidosInv
                }
            }
            queryClient.setQueryData(['pagosSalientes'], (oldPagos)=> oldPagos.map(p=>p.id===newPago.id ? newPago :p))
           // queryClient.invalidateQueries(['pagosSalientes'])
            notify('Pago saliente actualizado con exito')
        },
        onError: (e) => console.log(e)
     })

    const {
        mutate:pagoUpdate,
        status:pagoUpdateStatus,
    } = PagosMutator

    return ({
        pagoUpdate,
        pagoUpdateStatus
    })
}

export default usePagoSaliente