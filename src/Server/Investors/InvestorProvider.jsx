import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useInvestor=(inversorId,option)=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getInvestor = async () => {
        const data=await myAxios.get(`inversor/${inversorId}/admin_detail/`);
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
        data:investorBeneficiarios,
        status:investorBeneficiariosStatus,
    } = InvestorBeneficiariosQuery

    return ({
        investor,
        investorStatus,
        investorBeneficiarios,
        investorBeneficiariosStatus
    })
}

export default useInvestor