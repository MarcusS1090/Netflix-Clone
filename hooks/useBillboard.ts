import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useBillboard = () => {
    //esto es para datos estaticos, aqui solo queremos que cuando el usuario se loguee
    //solo muestre 1 y no cada vez que el salga de la ventana
    const {data, error, isLoading} = useSWR('/api/random', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return{
        data,
        error,
        isLoading
    }
}

export default useBillboard;