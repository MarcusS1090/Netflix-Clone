import axios from 'axios';
import React, { useCallback, useMemo } from 'react';

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

import {TbPlus, TbCheck} from 'react-icons/tb'

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const {mutate: mutateFavorites } = useFavorites();
    const {data: currentUser, mutate } = useCurrentUser();

    //vamos a crear una variable para ver si una pelicula ya esta en favoritos o no
    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;

        //vamos a ver si es favorita la podremos eliminar de nuestra lista de favoritos
        if (isFavorite) {
            response = await axios.delete(`/api/favorite?movieId=${movieId}`);
        } else {
            //si marcamos como favorita entonces hacemos una llamada
            response = await axios.post("/api/favorite", { movieId });
        }

        //aqui hacemos esta variable para acutalizar nuestra lista de favoritos
        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        });
        mutateFavorites();
    }, [
        currentUser,
        isFavorite,
        mutate,
        mutateFavorites,
        movieId
    ]);

    const Icon = isFavorite ?  TbCheck : TbPlus;
    return (
        <div 
            onClick={toggleFavorites}
            className="
                cursor-pointer
                group/item
                w-6
                h-6
                lg:w-10
                lg:h-10
                border-white
                border-2
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:border-neutral-300
            "
        >  
            <Icon className="text-white" size={23}/>
        </div>
    )
}

export default FavoriteButton;