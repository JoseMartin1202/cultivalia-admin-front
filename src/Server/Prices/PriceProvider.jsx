import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';

const usePrice=()=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();

    /**Functions */
    const addPrice = async (values) =>{
        console.log(values)
        const res=await myAxios.post("/precioplanta/",values)
        return res.data
    }

    /**Querys */
    const PriceAddMutator = useMutation({
        mutationFn: addPrice,
        onSuccess: () => {
            queryClient.invalidateQueries(['preciosPlantas']) 
            notify('Precio añadido con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true),
    })
    const {
        mutate:priceAdd,
        status:priceAddStatus
    }=PriceAddMutator

    return({
        priceAdd,
        priceAddStatus
    })
}

export default usePrice