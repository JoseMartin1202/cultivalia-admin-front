import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useProperties=()=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getProperties = async () => {
        const data=await myAxios.get(`predio/`);
        return data.data;
    }

    /**Querys */
    const PropertiesQuery= useQuery({
        queryKey:['predios'],
        queryFn:getProperties,
        enabled: !!session 
    })

    const {
        data:properties,
        status:propertiesStatus,
    } = PropertiesQuery

    return ({
        properties,
        propertiesStatus
    })
}

export default useProperties