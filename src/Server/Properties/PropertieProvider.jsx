import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext"
import { useApp } from '../../context/AppContext';

const usePropertie=(propertieId)=>{
    const {myAxios} = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();

    /*const getPredio = async() =>{
        const res= await myAxios.get(`predio/${propertieId}/`);
        return res.data
    }*/

    const updatePartial = async(values) =>{
        console.log(values)
        const res = await myAxios.patch(`predio/${propertieId}/`, values)
        return res.data
    }

    const addPredio = async(values) =>{
        console.log(values)
        const res= await myAxios.post(`predio/`,values);
        return res.data
    }

    /*const PropertieQuery = useQuery({
        querykey:['predio',propertieId],
        queryFn: getPredio,
        enabled: !!propertieId
    })*/

    const PropertieMutator = useMutation({
        mutationFn: updatePartial,
        onSuccess: () => {
            queryClient.invalidateQueries(['predios']) 
            notify('Predio actualizado con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true),
        enabled: !!propertieId
    })

    const PropertieAddMutator = useMutation({
        mutationFn: addPredio,
        onSuccess: () => {
            queryClient.invalidateQueries(['predios']) 
            notify('Predio añadido con éxito');
        },
        onError: (e) => notify(getErrorMessage(e), true)
    });


    /*const {
        data: propertie,
        status: propertieStatus
    } = PropertieQuery*/

    const {
        mutate: updatePropertie,
        status: updatePropertieStatus
    } = PropertieMutator

    const {
        mutate: propertieAdd,
        status: propertieAddStatus
    } = PropertieAddMutator

    return({
        updatePropertie, 
        updatePropertieStatus,
        propertieAdd,
        propertieAddStatus
    })
    
}

export default usePropertie