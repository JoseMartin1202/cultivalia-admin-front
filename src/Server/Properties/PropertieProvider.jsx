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
        if(values.galeria=="ninguna"){
            values.galeria='';
        }
        console.log(values.galeria)
        if(typeof values.photo_cover === 'string' ){
            delete values.photo_cover;
        }else  if(values.photo_cover === null ){
            values.photo_cover='';
        }
        const formData = new FormData()
        Object.keys(values).forEach(key => {
            if (values[key] === null || values[key] === undefined) { return; }
                formData.append(key, values[key]);
        })
        const res = await myAxios.patch(`predio/${propertieId}/`, formData)
        return res.data
    }

    const addPredio = async(values) =>{
        if(values.galeria=="ninguna"){
            values.galeria=null;
        }
        const formData = new FormData()
        Object.keys(values).forEach(key => {
            if (values[key] === null || values[key] === undefined) { return; }
                formData.append(key, values[key]);
        })

        const res= await myAxios.post(`predio/`,formData);
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
        propertieAddStatus,
    })
    
}

export default usePropertie