import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const usePrices=()=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getPrices = async () =>{
        const res=await myAxios.get("precioplanta/")
        return res.data
    }

    /**Querys */
    const PricesQuery = useQuery({
        queryKey: ['preciosPlantas'],
        queryFn: getPrices,
        enabled: !!session
    })

    const {
        data:prices,
        status:pricesStatus
    }=PricesQuery

    return({
        prices,
        pricesStatus
    })
}

export default usePrices