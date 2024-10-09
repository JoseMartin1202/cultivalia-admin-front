import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';
import useSession from '../Session/SessionProvider';

const useGalleries=()=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();
    const { session } = useSession();

    /**Functions */
    const getGalleries = async () => {
        const data=await myAxios.get('galeria/');
        return data.data;
    }

    const addGallery = async (values) =>{
       const res= await myAxios.post('galeria/',values)
       return res.data
    }

    /**Querys */
    const GalleriesQuery= useQuery({
        queryKey:['galerias'],
        queryFn:getGalleries,
        enabled: !!session
    })

    const addGallleryMutator = useMutation({
        mutationFn: addGallery,
        onSuccess: () => {
            queryClient.invalidateQueries(['galerias']) 
            notify('Galería añadida con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true),
    })

    const {
        data:galleries,
        status:galleriesStatus,
    } = GalleriesQuery

    
    const {
        mutate:galerryAdd,
        status:galerryAddStatus,
    } = addGallleryMutator

    return ({
        galleries,
        galleriesStatus,
        galerryAdd,
        galerryAddStatus
    })
}

export default useGalleries