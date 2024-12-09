import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAxios } from "../../context/AxiosContext"
import useSession from "../Session/SessionProvider"
import { useApp } from "../../context/AppContext"


const useSale=()=>{
    const { myAxios } = useAxios()
    const queryClient = useQueryClient();
    const { notify } = useApp();
    /**Functions */
    const cancelSale = async (id) => {
        const data=await myAxios.get(`venta/cancelSale/?id=${id}`);
        return data.data;
    }

    /**Querys */
    const CancelSaleMutator = useMutation({
        mutationFn: cancelSale,
        onSuccess: () => {
             queryClient.invalidateQueries(['ventas']) 
             queryClient.invalidateQueries(['ofertas']) 
             notify('Venta cancelada con exito')
         },
        onError: (e) => notify(getErrorMessage(e), true),
    })

    const {
        mutate: sales,
        status: salesStatus
    }=CancelSaleMutator

    return ({
        sales,
        salesStatus
    })
}

export default useSale