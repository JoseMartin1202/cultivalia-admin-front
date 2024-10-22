import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';
import useSession from '../Session/SessionProvider';

const usePrice=()=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();
    const { session } = useSession();

    /**Functions */
    const addPrice = async (values) =>{
        let dataToSend = {};
        if(values.forma=="Manual"){
            dataToSend = {
                precio: values.precio,
                anio: values.anio,
                isJimated: values.isJimated,
                isCurrent: values.isCurrent,
            };
            const res=await myAxios.post("precioplanta/",dataToSend)
            return res.data
        }else{
            const res=await myAxios.post("precioplanta/automatico/",values)
            return res.data
        }
    }

        /**Functions */
    const getYearsWithPriceExisting = async () => {
        const data=await myAxios.get(`precioplanta/existing`);
        return data.data;
    }
    /**Querys */
    const YearsExistingQuery= useQuery({
        queryKey:['añosExistentes'],
        queryFn:getYearsWithPriceExisting,
        enabled: !!session 
    })

    const PriceAddMutator = useMutation({
        mutationFn: addPrice,
        onSuccess: () => {
            queryClient.invalidateQueries(['preciosPlantas']) 
            notify('Precio añadido con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true),
    })

    const {
        data:yearsExisting,
        status:yearsExisitngStatus,
    } = YearsExistingQuery

    const {
        mutate:priceAdd,
        status:priceAddStatus
    }=PriceAddMutator

    return({
        priceAdd,
        priceAddStatus,
        yearsExisting,
        yearsExisitngStatus
    })
}

export default usePrice