import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const usePagosSalientes=()=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getPagos = async () => {
        const data=await myAxios.get(`pagosaliente/`);
        return data.data;
    }

    /**Querys */
    const PagosQuery= useQuery({
        queryKey:['pagosSalientes'],
        queryFn:getPagos,
        enabled: !!session 
    })

    const {
        data:pagosSalientes,
        status:pagosSalientesStatus,
    } = PagosQuery

    return ({
        pagosSalientes,
        pagosSalientesStatus
    })
}

export default usePagosSalientes