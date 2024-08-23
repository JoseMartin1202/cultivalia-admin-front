import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useGalleries=()=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getGalleries = async () => {
        const data=await myAxios.get(`galeria/`);
        return data.data;
    }

    /**Querys */
    const GalleriesQuery= useQuery({
        queryKey:['galerias'],
        queryFn:getGalleries,
        enabled: !!session 
    })

    const {
        data:galleries,
        status:galleriesStatus,
    } = GalleriesQuery

    return ({
        galleries,
        galleriesStatus
    })
}

export default useGalleries