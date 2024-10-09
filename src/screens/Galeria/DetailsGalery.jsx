import React, { useState, useEffect, useRef } from 'react';
import '../../index.css'
import { Icons } from '../../constants/Icons';
import { useNavigate, useParams } from 'react-router-dom';
import useGallery from '../../Server/Gallery/GalleryProvider';
import Loader from '../../components/Loader';
import ModalElimiar from '../../components/modals/ModalEliminar';
import { useFormik } from 'formik';
import GenericModal from '../../components/modals/GenericModal';
import FileInput from '../../components/inputs/FileInput';
import * as Yup from 'yup';
import Image from '../../components/Image';
import { useMediaQuery } from 'react-responsive';

export const DetailsGallery=()=>{

    const containerRef = useRef(null);
    const navigate =useNavigate();
    const { galleryId } = useParams();
    const {deletePhotosStatus,dropPhotoStatus,deletePhotos,dropPhoto, photosGallery, photosGalleryStatus}= useGallery(galleryId)
    const [eliminarTodas, setEliminarTodas] = useState(false)
    const [modal, setModal] = useState(false)
    const [eliminando, setEliminando] = useState(false)
    const [showPhoto, setShowPhoto] = useState(false)
    const [btnmodal, setBtnModal] = useState(false)
    const [photoId, setphotoId] = useState()
    const [showFormModal, setShowFormModal] = useState(false)
    const [initIndex, setInitIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const updateColumns = () => {
            const container = containerRef.current;
            if (container) {
                const containerWidth = container.offsetWidth;
                const itemWidth = 240; // Ancho del elemento en píxeles (ajusta según tu diseño)
                const gap = 16; // Espacio entre elementos en píxeles (ajusta según tu diseño)
                const newColumns = Math.floor(containerWidth / (itemWidth + gap));
                container.style.gridTemplateColumns = `repeat(${newColumns}, minmax(0, 1fr))`;
            }
        };
    
        const handleImageLoad = () => {
            updateColumns();
        };
    
        // Debounce para el evento de redimensionado
        let debounceTimer;
        const debounceResize = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                requestAnimationFrame(updateColumns);
            }, 100); // Ajusta el tiempo de debounce según tus necesidades
        };
    
        // ResizeObserver para detectar cambios en el tamaño del contenedor
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updateColumns);
        });
    
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
    
        // Añadir el listener para cada imagen
        const images = containerRef.current.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                handleImageLoad();
            } else {
                img.addEventListener('load', handleImageLoad);
            }
        });
    
        window.addEventListener('resize', debounceResize);
    
        // Ejecutar el cálculo inicial al montar el componente
        updateColumns();
    
        return () => {
            window.removeEventListener('resize', debounceResize);
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
            images.forEach(img => img.removeEventListener('load', handleImageLoad));
        };
    }, [photosGalleryStatus]);
    
    useEffect(()=>{
        if(deletePhotosStatus=='success'){
            setBtnModal(false)
            setEliminando(false)
            setEliminarTodas(false)
            setModal(false)
        }
    },[deletePhotosStatus])

    useEffect(()=>{
        if(dropPhotoStatus=='success' ){
            setBtnModal(false)
            setEliminando(false)
            setEliminarTodas(false)
            setModal(false)
        }
    },[dropPhotoStatus])
  
    return (
    <>
    {showPhoto &&
        <PhotosModal
           photos={photosGallery}
           onClose={() => setShowPhoto(false)}
           initIndex={initIndex}
        />
    } 
    <div className='sm:ml-14 w-full h-full flex flex-col gap-3 bg-slate-100 p-2 overflow-y-auto'>
        { modal && 
            <ModalElimiar
                title={eliminarTodas ? "Eliminar todas":"Eliminar foto"}
                close={()=>setModal(false)}
                content={
                        <div className='total-center text-xl'>
                            <div className=' flex-col total-center text-center gap-3'>
                                {console.log(deletePhotosStatus)}
                                {
                                eliminando ? 
                                <>
                                <Loader />
                                {dropPhotoStatus==='pending' &&  <p>Eliminando...</p>}
                                {deletePhotosStatus==='pending' &&  <p>Eliminando...</p>}
                                </>:
                                eliminarTodas ?
                                <>{photosGalleryStatus ==='success' && photosGallery.length>0 ?
                                    <>
                                    <p>¿Estás seguro que deseas eliminar todas las fotos?</p>
                                    <Icons.Alert className='size-24 text-red-400'/>
                                    </>:
                                    <>
                                    <p>No hay fotos por eliminar</p>
                                    <Icons.Empty className='size-24 text-orange-300'/>
                                    </>
                                }</>:<> {photosGalleryStatus ==='success' && photosGallery.length>0 &&
                                    <div className='flex flex-col total-center gap-3'>
                                    <p>¿Estás seguro que deseas eliminar esta foto?</p>
                                    <Icons.Alert className='size-24 text-red-400'/>
                                    </div>
                                }</>}
                            </div>
                        </div> 
                }
                loading={btnmodal}
                actions={[{ label: "Aceptar", onClick: ()=> {
                    if(photosGalleryStatus ==='success' && photosGallery.length>0){
                        setBtnModal(true)
                        setEliminando(true)
                        if(eliminarTodas){
                            deletePhotos()
                        }else{
                            dropPhoto(photoId)
                        }
                    }else{
                        setModal(false)
                    }
                    
                }}]}
           />
        }
        {showFormModal &&
            <FormModal
               title={"Nueva foto"}
               id={galleryId}
               close={()=>setShowFormModal(false)}
            />
         }
        <div className='w-full h-full bg-white shadow-lg  rounded-2xl overflow-y-auto p-2'>
            <div ref={containerRef} className='w-full h-fit grid gap-4'>
                {photosGalleryStatus ==='pending' ? <Loader/>: 
                photosGalleryStatus  ==='success' ? 
                (photosGallery.length>0 && 
                    photosGallery.map((photo,i)=>(
                        <div key={i} className='w-full h-40 rounded-2xl relative'>
                            {loading&& <Loader/>}
                            <img src={photo.file} className={`over:cursor-pointer size-full object-cover max-h-40 rounded-2xl ${loading ? 'invisible' : 'visible'}`} 
                            onClick={()=>{ setInitIndex(i);setShowPhoto(true)}}  onLoad={() => setLoading(false)}/>
                            <button className='absolute top-0 right-0 bg-gray-700/70 rounded-s-lg rounded-se-2xl rounded-ee-lg' 
                            onClick={()=>{setphotoId(photo.id); setEliminarTodas(false); setModal(true)}}>
                            <Icons.Trash className='size-8 p-2 text-red-500' /></button>
                        </div>
                    )) 
                  ):''}
                <div className='w-full h-40 rounded-2xl border-2 border-[#696969] hover:bg-gray-700/30 hover:text-white flex flex-col items-center gap-2'>
                  <button className='size-full total-center' onClick={()=>setShowFormModal(true)}><Icons.AddGallery className='size-full max-h-40' /></button>
                </div>
            </div>
        </div>
        <div className='w-full flex gap-3 flex-row total-center font-[Roboto]'>
            <button className='h-full' onClick={()=>{navigate(-1)}}><Icons.ArrowBack className='size-10 text-[#6B9DFF] hover:text-[#81aafe]'/></button>
            <div className='bg-[#E2E8F0] w-fit p-2 font-bold text-md rounded-xl'>
                    {<p>Fotos: {photosGallery?.length}</p>}
            </div>
            <button className='ms-auto hover:bg-red-300 max-sm:text-base text-lg font-bold bg-red-400 rounded-full py-1 px-3' onClick={()=>{setEliminarTodas(true); setModal(true)}}>Eliminar todas</button>
        </div>
    </div>
    </>   
    );
}

const FormModal = ({ close, title, id }) => {
    const {AddPhotoStatus,AddPhoto}= useGallery(id)
    
    useEffect(()=>{
       if(AddPhotoStatus === 'success'){
            close()
       }
    },[AddPhotoStatus])

    const initVals = {
       galeria: id,
       file: null,
    }
 
    const formik = useFormik({
        initialValues: initVals,
        validationSchema: Yup.object().shape({
            file: Yup.string().required('Requerido')
          }),
        onSubmit: async (values) => {
            AddPhoto(values)
        }
    })
 
 
    return (
       <GenericModal
          title={title}
          content={
             <div className='p-4'>
                <div className='p-2 border text-xl'>
                    {AddPhotoStatus === 'pending' ?
                     <div className='total-center flex-col '>
                     <Loader/>
                     <p>Subiendo...</p></div>:
                     <FileInput id="file" formik={formik} />
                     }
                </div>
             </div>
          }
          loading={AddPhotoStatus === 'pending'}
          close={close}
          actions={[{ label: "Guardar", onClick: formik.handleSubmit}]}
          necesary={false}
          gallery={true}
       />
    )
 }

export const PhotosModal = ({ onClose, initIndex, photos, supervision }) => {
    const [selectedImg, setSelectedImg] = useState(initIndex)
 
    const handleNextImg = () => {
       setSelectedImg(p => {
          if (p === photos.length - 1)
             return 0
          return p + 1
       })
    }
 
    const handlePrevImg = () => {
       setSelectedImg(p => {
          if (p === 0)
             return photos.length - 1
          return p - 1
       })
    }
 
    useEffect(() => {
       function handleKeyDown(e) {
          if (e.key === 'ArrowRight') {
             handleNextImg()
          } else if (e.key === 'ArrowLeft') {
             handlePrevImg()
          } else if (e.key === 'Escape') {
             onClose()
          }
       }
       document.addEventListener('keydown', handleKeyDown)
       return () => {
          document.removeEventListener('keydown', handleKeyDown)
       }
    }, [])

    return (
       <div className='absolute z-10 bg-neutral-900/90 size-full total-center'>
 
          <div className='absolute size-full left-0 top-0' onClick={onClose}></div>
          <div className='py-10 px-14 max-sm:px-2 size-full total-center'>
                {supervision ? <Image src={photos[selectedImg]} alt=""/>:
                <Image src={photos[selectedImg].file} alt="" />}
          </div>
        {photos.length>1 && <>
            <button
             onClick={handlePrevImg}
             className='absolute top-0 left-0 h-full outline-none w-14 total-center'>
             <Icons.Left className='text-blue-200 size-11 max-sm:size-8' />
          </button>
          <button
             onClick={handleNextImg}
             className='absolute top-0 right-0 h-full outline-none w-14 total-center'>
             <Icons.Right className='text-blue-200 size-11 max-sm:size-8' />
          </button>
        
        </>}
          
 
       </div>
    )
 
 }

export default DetailsGallery