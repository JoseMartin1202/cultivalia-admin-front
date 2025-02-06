import { useMutation, useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';
import { useApp } from '../../context/AppContext';

const useNotify=(inversorId)=>{
    const { myAxios } = useAxios();
    const { notify } = useApp();

    /**Functions */
    const notifyInversor = async () => {
        const data=await myAxios.post(`notificacion/${inversorId}/notify_inversor/`);
        return data.data;
    }

    /**Querys */
    const InvestorNotifyQuery= useMutation({
        mutationFn:notifyInversor,
        onSuccess: () => {
            console.log('jala')
            notify("Inversor notificado con exito")
          },
          onError: (error) => {
            notify("No fue posible notificar al inversor",error)
          }
    })

    const {
        mutate:inversorNotify,
        status:investorNotifyStatus,
    } = InvestorNotifyQuery

    return ({
        inversorNotify,
        investorNotifyStatus
    })
}

export default useNotify