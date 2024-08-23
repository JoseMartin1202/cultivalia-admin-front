import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useYears=()=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getYears = async () => {
        const data=await myAxios.get(`anio/`);
        return data.data;
    }

    /**Querys */
    const YearsQuery= useQuery({
        queryKey:['años'],
        queryFn:getYears,
        enabled: !!session 
    })

    const {
        data:years,
        status:yearsStatus,
    } = YearsQuery

    return ({
        years,
        yearsStatus
    })
}

export default useYears