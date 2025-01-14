import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useOffers=()=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getOffers = async () =>{
        const res=await myAxios.get("/oferta/")
        return res.data
    }

    /**Querys */
    const OffersQuery = useQuery({
        queryKey: ['ofertas'],
        queryFn: getOffers,
        enabled: !!session
    })

    const {
        data:offers,
        status:offersStatus
    }=OffersQuery

    return({
        offers,
        offersStatus
    })
}

export default useOffers