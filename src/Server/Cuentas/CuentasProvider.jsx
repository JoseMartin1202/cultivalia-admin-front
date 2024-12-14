import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useCuentas=(id)=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getCuentasInversor = async () => {
        console.log(id)
        const data=await myAxios.get(`cuenta/cuentasInversor/?id=${id}`);
        return data.data;
    }

    /**Querys */
    const PagosQuery= useQuery({
        queryKey:['cuentasInversor',id],
        queryFn:getCuentasInversor,
        enabled: !!id 
    })

    const {
        data:cuentasInversor,
        status:cuentasInversorStatus,
    } = PagosQuery

    return ({
        cuentasInversor,
        cuentasInversorStatus
    })
}

export default useCuentas