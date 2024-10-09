import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';

const useOffer=(inversorId)=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();
    
    /*/**Functions 
    const updatePartial = async(values) =>{
        const res = await myAxios.patch(`oferta/${offerId}/`, values)
        return res.data
    }*/

    const addOffer = async(values) =>{
        let dataToSend = {};
        if(values.tipo=="Directa"){
            dataToSend = {
                tipo: values.tipo,
                is_visible: values.is_visible_directa,
                plantas_disponibles: values.plantas_disponibles_directa,
                plantas_totales: values.plantas_totales_directa,
                predio: values.predio_directa,
            };
        }else{
            dataToSend = {
                tipo: values.tipo,
                is_visible: values.is_visible_indirecta,
                plantas_disponibles: values.plantas_disponibles_indirecta,
                plantas_totales: values.plantas_totales_indirecta,
                predio: values.predio_indirecta,
                precio_reventa: values.precio_reventa,
                distribucion: values.distribucion,
            };
        }
        const res= await myAxios.post(`oferta/`,dataToSend);
        return res.data
    }

    const getVendedores = async()=>{
        const res= await myAxios.get('inversor/');
        return res.data
    }

    const getDistribucionesInversor = async()=>{
        const res= await myAxios.get(`distribucion/inversor/${inversorId}/`);
        return res.data
    }

    /**Querys */
    const VendedoresQuery = useQuery({
        queryKey:['vendedores'],
        queryFn: getVendedores
    })

    const DistribucionesInversor = useQuery({
        queryKey: ['distribucionesInversor', inversorId],
        queryFn: getDistribucionesInversor,
        enabled: !!inversorId
    })

    /*const OfferMutator = useMutation({
        mutationFn: updatePartial,
        onSuccess: () => {
            queryClient.invalidateQueries(['ofertas']) 
            notify('Oferta actualizada con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true),
        enabled: !!offerId 
    })*/

    const OfferAddMutator = useMutation({
        mutationFn: addOffer,
        onSuccess: () => {
            queryClient.invalidateQueries(['ofertas']) 
            notify('Oferta añadida con éxito');
        },
        onError: (e) => notify(getErrorMessage(e), true)
    });

    const {
        data:vendedores,
        status:vendedoresStatus
    }=VendedoresQuery

    const {
        data:distribucionesInversor,
        status:distribucionesInversorStatus
    }=DistribucionesInversor

    /*const {
        mutate:updateOffer,
        status:updateOfferStatus
    }=OfferMutator*/

    const {
        mutate:offerAdd,
        status:offerAddStatus
    }=OfferAddMutator

    return({
        vendedores,
        vendedoresStatus,
        offerAdd,
        offerAddStatus,
        distribucionesInversor,
        distribucionesInversorStatus
    })
}

export default useOffer