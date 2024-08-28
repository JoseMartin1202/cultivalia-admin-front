import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import { useApp } from '../../context/AppContext';

const useGallery=(galeryId)=>{
    const { myAxios } = useAxios();
    const { notify } = useApp();
    const queryClient = useQueryClient();
    /**Functions */
    const getPhotos = async () => {
        const data=await myAxios.get(`fotografia/galeria/${galeryId}/`);
        return data.data;
    }

    const addPhoto = async (item) => {
        const formData = new FormData()
        Object.keys(item).forEach(key => {
            if (item[key] === null || item[key] === undefined) { return; }
                formData.append(key, item[key]);
        })
          // Imprimir el contenido del FormData
        /*for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }*/

        const res = await myAxios.post(`fotografia/`, formData)
        return res.data
     }
  

    const deletePhoto = async (photoId) => {
        await myAxios.delete(`fotografia/${photoId}`);
        return photoId
    }

    const deletePhotosGallery = async () => {
        if (!photosGallery || photosGallery.length === 0) return false;
        const deletePromises = photosGallery.map(foto =>
            myAxios.delete(`fotografia/${foto.id}`)
        );
        await Promise.all(deletePromises);
        return true
    }

    const reloadPhotos= async () =>{
        queryClient.invalidateQueries(['fotosGaleria',galeryId]) 
    }

    /**Querys */
    const PhotosGalleryQuery= useQuery({
        queryKey:['fotosGaleria',galeryId],
        queryFn:getPhotos,
    })

    const AddPhotoMutator = useMutation({
        mutationFn: addPhoto,
        onSuccess: (newPhoto) => {
           queryClient.setQueryData(['fotosGaleria', galeryId],
              (oldPhotos) => ([...oldPhotos, newPhoto])
           )
           notify('Foto añadida correctamente')
        },
        onError: (e) => notify(getErrorMessage(e), true)
     })

    const DeletePhotoMutator = useMutation({
        mutationFn: deletePhoto,
        onSuccess: (deletedPhotoId) => {
            queryClient.setQueryData(['fotosGaleria',galeryId], 
                (oldPhotos)=> oldPhotos.filter(photo => photo.id !== deletedPhotoId)
            )
            notify('Foto eliminada con éxito');
        },
        onError: (e) => notify(getErrorMessage(e), true)
    }); 

    const DeletePhotosMutator = useMutation({
        mutationFn: deletePhotosGallery,
        onSuccess: () => {
            queryClient.setQueryData(['fotosGaleria',galeryId],[])
            notify('Fotos eliminadas con éxito');
        },
        onError: (e) => notify(getErrorMessage(e), true),
    }); 

    const {
        data:photosGallery,
        status:photosGalleryStatus,
    } = PhotosGalleryQuery

    const {
        mutate:AddPhoto,
        status:AddPhotoStatus,
    } = AddPhotoMutator

    const {
        mutate:dropPhoto,
        status:dropPhotoStatus,
    } = DeletePhotoMutator

    const {
        mutate:deletePhotos,
        status:deletePhotosStatus,
    } = DeletePhotosMutator

    return ({
        photosGallery,
        photosGalleryStatus,
        reloadPhotos,
        dropPhoto,
        dropPhotoStatus,
        deletePhotos,
        deletePhotosStatus,
        AddPhoto,
        AddPhotoStatus
    })
}

export default useGallery