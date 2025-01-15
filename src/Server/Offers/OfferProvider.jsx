import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';
import { useState } from 'react';

const useOffer=(inversorId,offerId,traerInversores)=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();
    const [predioN,setPredioN]= useState('')
    const [anio,setAnio]= useState('')
    const [precioP,setprecioP]= useState('')
    //Functions 
    const updateVisibilidad = async(values) =>{
        const res = await myAxios.patch(`oferta/${offerId}/`, values)
        return res.data
    }

    const addOffer = async(values) =>{
        let dataToSend = {};
        setPredioN(values.predioName)
        setAnio(values.anio)
        setprecioP(values.precioPlanta)
        if(values.tipo=="Directa"){
            dataToSend = {
                tipo: values.tipo,
                is_visible: values.is_visible_directa,
                plantas_disponibles: values.plantas_disponibles_directa,
                plantas_totales: values.plantas_totales_directa,
                predio: values.predio_directa,
                descuento_porcentaje: values.descuento_porcentaje
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
                descuento_porcentaje: values.descuento_porcentaje
            };
        }
        const res= await myAxios.post(`oferta/`,dataToSend);
        return res.data
    }

    const getVendedores = async()=>{
        const res= await myAxios.get('inversor/oferta');
        return res.data
    }

    const getDistribucionesInversor = async()=>{
        const res= await myAxios.get(`distribucion/inversor/${inversorId}/`);
        return res.data
    }

    /**Querys */
    const VendedoresQuery = useQuery({
        queryKey:['vendedores'],
        queryFn: getVendedores,
        enabled: !!traerInversores
    })

    const DistribucionesInversor = useQuery({
        queryKey: ['distribucionesInversor', inversorId],
        queryFn: getDistribucionesInversor,
        enabled: !!inversorId
    })

    const OfferVisibilityMutator = useMutation({
        mutationFn: updateVisibilidad,
        onSuccess: () => {
            queryClient.invalidateQueries(['ofertas']) 
            notify('Oferta modificada exitosamente')
        },
        onError: (e) => notify(getErrorMessage(e), true),
        enabled: !!offerId 
    })

    const OfferAddMutator = useMutation({
        mutationFn: addOffer,
        onSuccess: (newOferta) => {
            // no tiene precio planta
            // newOferta={
            //     ...newOferta,
            //     predio:{
            //         id:newPredio.predio,
            //         nombre:predioN
            //     },
            //     precio_planta:precioP,
            //     anio_precio:anio
            // }
            // console.log(newOferta)
            // queryClient.setQueryData(['ofertas'], (oldOfertas) => oldOfertas ? [...oldOfertas, newOferta] : [newOferta]); 
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

    const {
        mutate:updateVisibilityOffer,
        status:updateVisibilityOfferStatus
    }=OfferVisibilityMutator

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
        distribucionesInversorStatus,
        updateVisibilityOffer,
        updateVisibilityOfferStatus
    })
}

export default useOffer