import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useAjusteTiempos=()=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getAjustes = async () => {
        const data=await myAxios.get(`ajusteTiempo/`);
        return data.data;
    }

    /**Querys */
    const AjustesQuery= useQuery({
        queryKey:['AjusteTiempos'],
        queryFn:getAjustes,
        enabled: !!session 
    })

    const {
        data:ajusteTiempos,
        status:ajusteTiemposStatus,
    } = AjustesQuery

    return ({
        ajusteTiempos,
        ajusteTiemposStatus
    })
}

export default useAjusteTiempos