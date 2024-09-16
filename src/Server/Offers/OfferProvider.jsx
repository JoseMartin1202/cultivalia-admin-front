import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';

const useOffer=(offerId)=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();

    /**Functions */
    const updatePartial = async(values) =>{
        const res = await myAxios.patch(`oferta/${offerId}/`, values)
        return res.data
    }

    const addOffer = async(values) =>{
        const res= await myAxios.post(`oferta/`,values);
        return res.data
    }

    const getVendedores = async()=>{
        const res= await myAxios.get('inversor/');
        return res.data
    }

    /**Querys */
    const VendedoresQuery = useQuery({
        queryKey:['vendedores'],
        queryFn: getVendedores
    })

    const OfferMutator = useMutation({
        mutationFn: updatePartial,
        onSuccess: () => {
            queryClient.invalidateQueries(['ofertas']) 
            notify('Oferta actualizada con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true),
        enabled: !!offerId
    })

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
        mutate:updateOffer,
        status:updateOfferStatus
    }=OfferMutator

    const {
        mutate:offerAdd,
        status:offerAddStatus
    }=OfferAddMutator

    return({
        vendedores,
        vendedoresStatus,
        updateOffer,
        updateOfferStatus,
        offerAdd,
        offerAddStatus
    })
}

export default useOffer