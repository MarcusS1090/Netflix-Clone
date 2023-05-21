//es similar a react query
import useSwr from 'swr';

import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
    //basicamente aqui vamos a fetch esta API por primera vez, no importa donde
    //usemos este hook no va hacer fetch otra vez si data ya existe
    const { data, error, isLoading, mutate } = useSwr('/api/current',fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;