import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useApp } from "../../context/AppContext";
import { useAxios } from "../../context/AxiosContext";
import { useNavigate } from "react-router-dom";
import useSession from '../Session/SessionProvider';

const useSupervision=(supervisionId)=>{
    const { myAxios } = useAxios();
    const { notify } = useApp();
    const queryClient = useQueryClient();
    const navigate= useNavigate();

    /**Functions */
    const getSupervision = async () => {
        const data=await myAxios.get(`supervision/${supervisionId}/`);
        return data.data;
    }

    const updatePartial = async(values) =>{
        const res = await myAxios.patch(`supervision/${supervisionId}/`, values)
        return res.data
    }

    /**Querys */
    const SupervisionQuery= useQuery({
        queryKey:['supervision',supervisionId],
        queryFn:getSupervision,
        enabled: !!supervisionId, // solo habilitar el query si hay un id
    })

    const SupervisionMutator = useMutation({
        mutationFn: updatePartial,
        onSuccess: (newSupervision) => {
            queryClient.setQueryData(['supervisiones'], 
                (oldSupervisions)=> oldSupervisions.map(s=>s.id===newSupervision.id ? 
                    { ...s, comentaios: newSupervision.comentaios, estado: newSupervision.estado, options:newSupervision.options } :s)
            )
            queryClient.setQueryData(['supervision',newSupervision.id], 
                (oldSupervision) => ({
                    ...oldSupervision, 
                    comentaios: newSupervision.comentaios, 
                    estado: newSupervision.estado,
                    options: newSupervision.options
                })
            )
            navigate(-1)
            notify('Supervisión actualizada con exito')
        },
        onError: (e) => console.log(e)
     })

    const {
        data:supervision,
        status:supervisionStatus,
    } = SupervisionQuery

    const {
        mutate:updateSupervision,
        status:updateSupervisionStatus,
    } =SupervisionMutator

    return ({
        supervision,
        supervisionStatus,
        updateSupervision,
        updateSupervisionStatus
    })
}

export default useSupervision