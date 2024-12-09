import { useQuery } from "@tanstack/react-query"
import { useAxios } from "../../context/AxiosContext"
import useSession from "../Session/SessionProvider"


const useSales=()=>{
    const { myAxios } = useAxios()
    const { session } = useSession()

    /**Functions */
    const getSales = async () => {
        const data=await myAxios.get(`venta/ventasAdmin/`);
        return data.data;
    }

    /**Querys */
    const SalesQuery= useQuery({
        queryKey:['ventas'],
        queryFn:getSales,
        enabled: !!session 
    })

    const {
        data: sales,
        status: salesStatus
    }=SalesQuery

    return ({
        sales,
        salesStatus
    })
}

export default useSales