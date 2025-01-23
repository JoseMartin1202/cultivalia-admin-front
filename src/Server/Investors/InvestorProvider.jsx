import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useInvestor=(inversorId,option)=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getInvestor = async () => {
        console.log(inversorId)
        const data=await myAxios.get(`inversor/${inversorId}/admin_detail/`);
        return data.data;
    }

    const getInvestorSales = async () => {
        const data=await myAxios.get(`inversor/${inversorId}/admin_sales_inversor/`);
        return data.data;
    }

    const getInvestorPagosE = async () => {
        const data=await myAxios.get(`inversor/${inversorId}/admin_pagosE_inversor/`);
        return data.data;
    }

    const getInvestorPagosS = async () => {
        const data=await myAxios.get(`inversor/${inversorId}/admin_pagosS_inversor/`);
        return data.data;
    }

    const getInvestorBeneficiarios = async () => {
        const data=await myAxios.get(`inversor/${inversorId}/admin_beneficiarios_inversor/`);
        return data.data;
    }

    /**Querys */
    const InvestorsQuery= useQuery({
        queryKey:['inversor',inversorId],
        queryFn:getInvestor,
        enabled: !!inversorId && !!session
    })

    const InvestorSalesQuery= useQuery({
        queryKey:['inversorSales',inversorId],
        queryFn:getInvestorSales,
        enabled: !!inversorId && !!session && option==='Compras'
    })

    const InvestorPagosEQuery= useQuery({
        queryKey:['inversorPagosE',inversorId],
        queryFn:getInvestorPagosE,
        enabled: !!inversorId && !!session && option==='Pagos entrantes'
    })

    const InvestorPagosSQuery= useQuery({
        queryKey:['inversorPagosS',inversorId],
        queryFn:getInvestorPagosS,
        enabled: !!inversorId && !!session && option==='Pagos salientes'
    })

    const InvestorBeneficiariosQuery= useQuery({
        queryKey:['inversorBeneficiarios',inversorId],
        queryFn:getInvestorBeneficiarios,
        enabled: !!inversorId && !!session && option==='Beneficiarios'
    })

    const {
        data:investor,
        status:investorStatus,
    } = InvestorsQuery

    const {
        data:investorSales,
        status:investorSalesStatus,
    } = InvestorSalesQuery

    const {
        data:investorPagosE,
        status:investorPagosEStatus,
    } = InvestorPagosEQuery

    const {
        data:investorPagosS,
        status:investorPagosStatus,
    } = InvestorPagosSQuery
    
    const {
        data:investorBeneficiarios,
        status:investorBeneficiariosStatus,
    } = InvestorBeneficiariosQuery

    return ({
        investor,
        investorStatus,
        investorSales,
        investorSalesStatus,
        investorPagosE,
        investorPagosEStatus,
        investorPagosS,
        investorPagosStatus,
        investorBeneficiarios,
        investorBeneficiariosStatus
    })
}

export default useInvestor