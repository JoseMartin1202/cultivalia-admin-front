import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';

const useAnio=()=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();

    /**Functions */
    const addAnio = async (values) =>{
        const res=await myAxios.post("anio/",values)
        return res.data
    }

    /**Querys */
    const AnioAddMutator = useMutation({
        mutationFn: addAnio,
        onSuccess: () => {
            queryClient.invalidateQueries(['años']) 
            notify('Año añadido con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true),
    })
    const {
        mutate:anioAdd,
        status:anioAddStatus
    }=AnioAddMutator

    return({
        anioAdd,
        anioAddStatus
    })
}

export default useAnio