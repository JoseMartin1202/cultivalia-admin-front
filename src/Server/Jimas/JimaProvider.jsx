import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAxios } from "../../context/AxiosContext";
import useSession from '../Session/SessionProvider';
import { useApp } from '../../context/AppContext';

const useJima=()=>{
    const { myAxios } = useAxios();
    const queryClient = useQueryClient();
    const { notify } = useApp();

    /**Functions */
    const addJima = async (values) => {
        console.log(values)
        const data=await myAxios.post("jima/",values);
        return data.data;
    }

    /**Querys */
    const JimaAddMutator = useMutation({
        mutationFn: addJima,
        onSuccess: () => {
            queryClient.invalidateQueries(['jimas']) 
            notify('Año añadido con exito')
        },
        onError: (e) => console.log(e),
    })

    const {
        mutate:jimaAdd,
        status:jimaAddStatus,
    } = JimaAddMutator

    return ({
        jimaAdd,
        jimaAddStatus
    })
}

export default useJima