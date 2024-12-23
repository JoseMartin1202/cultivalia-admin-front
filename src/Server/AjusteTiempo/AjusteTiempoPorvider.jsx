import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';
import useSession from '../Session/SessionProvider';

const useAjusteTiempo=()=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();

    /**Functions */
    const addAjuste = async (values) =>{
        const ajuste={
            contratoVariables:{
                porcentaje_cultivalia:values.porcentaje,
                duracion_anios:values.anios
            },
            predio:values.predio,
            comentarios:values.comentarios
        }
        const res= await myAxios.post('ajusteTiempo/',ajuste)
        return res.data
    }

    /**Querys */
    const addAjusteMutator = useMutation({
        mutationFn: addAjuste,
        onSuccess: () => {
            queryClient.invalidateQueries(['ajusteTiempos']) 
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