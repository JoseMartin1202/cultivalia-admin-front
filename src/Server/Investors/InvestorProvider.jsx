import { useQuery } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';

const useInvestor=(inversorId)=>{
    const { myAxios } = useAxios();
    const { session } = useSession();

    /**Functions */
    const getInvestor = async () => {
        console.log(inversorId)
        const data=await myAxios.get(`inversor/${inversorId}/admin_detail/`);
        return data.data;
    }

    /**Querys */
    const InvestorsQuery= useQuery({
        queryKey:['inversor',inversorId],
        queryFn:getInvestor,
        enabled: !!inversorId 
    })

    const {
        data:investor,
        status:investorStatus,
    } = InvestorsQuery

    return ({
        investor,
        investorStatus
    })
}

export default useInvestor