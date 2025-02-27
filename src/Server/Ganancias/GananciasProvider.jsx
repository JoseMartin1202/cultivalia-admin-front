import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useGanancias=()=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getGanancias = async () => {
        const data=await myAxios.get(`ganancia`);
        return data.data;
    }

    /**Querys */
    const GananciasQuery= useQuery({
        queryKey:['ganancias'],
        queryFn:getGanancias,
        enabled: !!session 
    })

    const {
        data:ganancias,
        status:gananciasStatus,
    } = GananciasQuery

    return ({
        ganancias,
        gananciasStatus
    })
}

export default useGanancias