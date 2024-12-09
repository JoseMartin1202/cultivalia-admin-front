import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';

const useAdvisor=(id)=>{
    const { myAxios } = useAxios();
    const { notify } = useApp();
    const queryClient = useQueryClient();
    /**Functions */

    const addAdvisor = async (values) => {
        const data=await myAxios.post(`asesor/`,values);
        return data.data;
    }

    const updateAdvisor = async (values) => {
        if (!id) throw new Error('ID es requerido para actualizar un asesor');
        const data=await myAxios.patch(`asesor/${id}/`,values);
        return data.data;
    }

    /**Querys */
    const AddAsesorMutator = useMutation({
        mutationFn: addAdvisor,
        onSuccess: () => {
            queryClient.invalidateQueries(['asesores'])      
            notify('Asesor añadido con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true),
    })

    const UpdateAsesorMutator = useMutation({
        mutationFn: updateAdvisor,
        onSuccess: () => {
            queryClient.invalidateQueries(['asesores'])
            notify('Asesor actualizado con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true),
    })

    const {
        mutate:advisorAdd,
        status:advisorAddStatus,
    } = AddAsesorMutator

    const {
        mutate:advisorUpdate,
        status:advisorUpdateStatus,
    } = UpdateAsesorMutator

    return ({
        advisorAdd,
        advisorAddStatus,
        advisorUpdate,
        advisorUpdateStatus
    })
}

export default useAdvisor