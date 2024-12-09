import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useAdvisors=()=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getAdvisors = async () => {
        const data=await myAxios.get(`asesor/`);
        return data.data;
    }

    /**Querys */
    const AdvisorsQuery= useQuery({
        queryKey:['asesores'],
        queryFn:getAdvisors,
        enabled: !!session 
    })

    const {
        data:advisors,
        status:advisorsStatus,
    } = AdvisorsQuery

    return ({
        advisors,
        advisorsStatus
    })
}

export default useAdvisors