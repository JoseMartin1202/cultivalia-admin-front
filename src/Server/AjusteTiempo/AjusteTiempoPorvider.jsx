import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';
import useSession from '../Session/SessionProvider';
import { useState } from 'react';

const useAjusteTiempo=()=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();
    const [nameAjuste,setnameAjuste]= useState()

    /**Functions */
    const addAjuste = async (values) =>{
        const ajuste={
            contratoVariables:{
                porcentaje_cultivalia:values.porcentaje,
                duracion_anios:values.anios,
                presidente: "ISRAEL GARCÍA ORTÍZ",
                totalVenta:5
            },
            predio:values.predio,
            comentarios:values.comentarios
        }
        setnameAjuste(values.predioNombre)
        const res= await myAxios.post('ajusteTiempo/',ajuste)
        return res.data
    }

    /**Querys */
    const addAjusteMutator = useMutation({
        mutationFn: addAjuste,
        onSuccess: (newAjuste) => {
            // newAjuste={
            //     ...newAjuste,
            //     predio: {   
            //         id: newAjuste.predio,  
            //         nombre: nameAjuste     
            //     }
            // }
            // queryClient.setQueryData(['AjusteTiempos'], (oldAjustes) => oldAjustes ? [...oldAjustes, newAjuste] : [newAjuste]);
            queryClient.invalidateQueries(['AjusteTiempos'])
            notify('Ajuste de tiempo añadido con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true),
    })

    const {
        mutate:ajusteAdd,
        status:ajusteAddStatus,
    } = addAjusteMutator

    return ({
        ajusteAdd,
        ajusteAddStatus,
    })
}

export default useAjusteTiempo