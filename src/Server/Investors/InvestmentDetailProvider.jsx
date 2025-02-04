import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useInvestment=(inversionId)=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    const getInvestorPagosE = async () => {
        const data=await myAxios.get(`inversor/${inversionId}/admin_pagosE_inversor/`);
        return data.data;
    }

    const getInvestorPagosS = async () => {
        const data=await myAxios.get(`inversor/${inversionId}/admin_pagosS_inversor/`);
        return data.data;
    }

    const InvestorPagosEQuery= useQuery({
        queryKey:['inversorPagosE',inversionId],
        queryFn:getInvestorPagosE,
        enabled: !!inversionId && !!session 
    })

    const InvestorPagosSQuery= useQuery({
        queryKey:['inversorPagosS',inversionId],
        queryFn:getInvestorPagosS,
        enabled: !!inversionId && !!session
    })

    const {
        data:investorPagosE,
        status:investorPagosEStatus,
    } = InvestorPagosEQuery

    const {
        data:investorPagosS,
        status:investorPagosStatus,
    } = InvestorPagosSQuery
    

    return ({
        investorPagosE,
        investorPagosEStatus,
        investorPagosS,
        investorPagosStatus,
    })
}

export default useInvestment