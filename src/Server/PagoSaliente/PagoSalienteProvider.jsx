import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const usePagoSaliente=(id)=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();

    /**Functions */
    const updatePago = async (values) => {
        if(id){
            const formData = new FormData()
            Object.keys(values).forEach(key => {
                if (values[key] === null || values[key] === undefined) { return; }
                    formData.append(key, values[key]);
            })
            for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
            }
            const data=await myAxios.patch(`pagosaliente/${id}/`,formData);
            return data.data;
        }
    }

    /**Querys */
    const PagosMutator = useMutation({
        mutationFn: updatePago,
        onSuccess: () => {
            queryClient.invalidateQueries(['pagosSalientes']) 
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