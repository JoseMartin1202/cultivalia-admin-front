import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useInvestment=(inversionId,option)=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    const getInvestorPagos = async () => {
        const data=await myAxios.get(`distribucion/${inversionId}/admin_pagos_inversor/`);
        return data.data;
    }

    const getContratos = async () => {
        const data=await myAxios.get(`contrato/por_distribucion/?distribucion=${inversionId}`);
        return data.data;
    }

    const getCartas = async () => {
        const data=await myAxios.get(`carta/por_distribucion/?distribucion=${inversionId}`);
        return data.data;
    }

    const InvestorPagosEQuery= useQuery({
        queryKey:['inversorPagos',inversionId],
        queryFn:getInvestorPagos,
        enabled: !!inversionId && !!session 
    })

    const investorContratosQ= useQuery({
        queryKey:['inversorContratos',inversionId],
        queryFn:getContratos,
        enabled: !!inversionId && !!session && option=='Contratos'
    })

    const InvestorCartasQ= useQuery({
        queryKey:['inversorCartas',inversionId],
        queryFn:getCartas,
        enabled: !!inversionId && !!session && option=='Cartas'
    })

    const {
        data:investorPagos,
        status:investorPagosStatus,
    } = InvestorPagosEQuery

    const {
        data:investorContratos,
        status:investorContratosStatus,
    } = investorContratosQ
    
    const {
        data:investorCartas,
        status:investorCartasStatus,
    } = InvestorCartasQ

    return ({
        investorPagos,
        investorPagosStatus,
        investorContratos,
        investorContratosStatus,
        investorCartas,
        investorCartasStatus
    })
}

export default useInvestment