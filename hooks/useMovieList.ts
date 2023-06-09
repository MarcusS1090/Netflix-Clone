import useSwr from 'swr';
import fetcher from '@/lib/fetcher';

const useMovieList = () =>{
    const { data,error, isLoading } = useSwr('/api/movies', fetcher, {
        //para no hacer tantas llamdas a la api 
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return{
        data,
        error,
        isLoading
    }
};

export default useMovieList;