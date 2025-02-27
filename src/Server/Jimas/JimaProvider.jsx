import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';
import { useApp } from '../../context/AppContext';
import { useState } from 'react';

const useJima=()=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();
    const [nameJima,setNameJima]= useState('')

    /**Functions */
    const addJima = async (values) => {
        const name=values.predioNombre
        setNameJima(name)
        delete values.predioNombre
        const data=await myAxios.post("jima/",values);
        return data.data;
    }

    /**Querys */
    const JimaAddMutator = useMutation({
        mutationFn: addJima,
        onSuccess: (newJima) => {
            // newJima={
            //     ...newJima,  // Mantén los otros datos de newJima
            //     predio: {    // Asigna un nuevo objeto a predio
            //         id: newJima.predio,  // Suponiendo que newJima.predio contiene el id
            //         nombre: nameJima     // Asigna el valor de nameJima a la propiedad nombre
            //     }
            // }
            // queryClient.setQueryData(['jimas'], (oldJimas) => oldJimas ? [...oldJimas, newJima] : [newJima]);
            queryClient.invalidateQueries('jimas')
            notify('Jima añadida con exito')
        },
        onError: (e) => notify('No se pudo añadir la jima',e)
    })

    const {
        mutate:jimaAdd,
        status:jimaAddStatus,
    } = JimaAddMutator

    return ({
        jimaAdd,
        jimaAddStatus
    })
}

export default useJima