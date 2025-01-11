import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';
import useSession from '../Session/SessionProvider';

const useGalleries=(galleryId)=>{
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

    const updateGallery = async (value) =>{
        const res= await myAxios.put(`galeria/${galleryId}/`,value)
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
        onSuccess: (newGallery) => {
             queryClient.setQueryData(['galerias'], (oldGalerias) => oldGalerias ? [...oldGalerias, newGallery] : [newGallery]); 
            notify('Galería añadida con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true),
    })

    const updateGallleryMutator = useMutation({
        mutationFn: updateGallery,
        onSuccess: () => {
            queryClient.invalidateQueries(['galeria',galleryId]) 
            notify('Galería actualizada con exito')
        },
        onError: (e) => notify(getErrorMessage(e), true)
    })

    const {
        data:galleries,
        status:galleriesStatus,
    } = GalleriesQuery

    const {
        mutate:galerryAdd,
        status:galerryAddStatus,
    } = addGallleryMutator

    const {
        mutate:galerryUpdate,
        status:galerryUpdateStatus,
    } = updateGallleryMutator

    return ({
        galleries,
        galleriesStatus,
        galerryAdd,
        galerryAddStatus,
        galerryUpdate,
        galerryUpdateStatus
    })
}

export default useGalleries