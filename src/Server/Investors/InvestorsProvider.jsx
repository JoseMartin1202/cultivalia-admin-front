import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useInvestors=()=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getInvestors = async () => {
        const data=await myAxios.get(`inversor/admin/`);
        return data.data;
    }

    /**Querys */
    const InvestorsQuery= useQuery({
        queryKey:['inversores'],
        queryFn:getInvestors,
        enabled: !!session 
    })

    const {
        data:investors,
        status:investorsStatus,
    } = InvestorsQuery

    return ({
        investors,
        investorsStatus
    })
}

export default useInvestors