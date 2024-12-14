import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useJimas=()=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getJimas = async () => {
        const data=await myAxios.get(`jima/`);
        return data.data;
    }

    /**Querys */
    const JimasQuery= useQuery({
        queryKey:['jimas'],
        queryFn:getJimas,
        enabled: !!session 
    })

    const {
        data:jimas,
        status:jimasStatus,
    } = JimasQuery

    return ({
        jimas,
        jimasStatus
    })
}

export default useJimas