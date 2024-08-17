import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useSupervisions=(supervisionId)=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getSupervisions = async () => {
        const data=await myAxios.get(`supervision/`);
        return data.data;
    }

    /**Querys */
    const SupervisionsQuery= useQuery({
        queryKey:['supervisiones'],
        queryFn:getSupervisions,
        enabled: !!session 
    })

    const {
        data:supervisions,
        status:supervisionsStatus,
    } = SupervisionsQuery

    return ({
        supervisions,
        supervisionsStatus
    })
}

export default useSupervisions