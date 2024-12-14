import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';
import { useNavigate } from 'react-router-dom';

const usePagoSaliente=(id)=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const navigate= useNavigate();

    /**Functions */
    const updatePago = async (values) => {
        if(id){
            const data=await myAxios.patch(`pagosaliente/${id}`,values);
            return data.data;
        }
    }

    /**Querys */
    const PagosMutator = useMutation({
        mutationFn: updatePago,
        onSuccess: () => {
          
            notify('Supervisión actualizada con exito')
        },
        onError: (e) => console.log(e)
     })

    const {
        mutate:pagoUpdate,
        status:pagoUpdateStatus,
    } = PagosMutator

    return ({
        pagoUpdate,
        pagoUpdateStatus
    })
}

export default usePagoSaliente