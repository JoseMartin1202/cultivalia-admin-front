import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useInvestment=(inversionId)=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    const getInvestorPagos = async () => {
        const data=await myAxios.get(`distribucion/${inversionId}/admin_pagos_inversor/`);
        return data.data;
    }

    const InvestorPagosEQuery= useQuery({
        queryKey:['inversorPagos',inversionId],
        queryFn:getInvestorPagos,
        enabled: !!inversionId && !!session 
    })
    const {
        data:investorPagos,
        status:investorPagosStatus,
    } = InvestorPagosEQuery

    return ({
        investorPagos,
        investorPagosStatus,
    })
}

export default useInvestment