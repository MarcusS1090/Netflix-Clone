import { useRouter } from 'next/router';
import {TbPlayerPlayFilled} from 'react-icons/tb';
import React from 'react'

interface PlayButtonProps {
    movieId: string;    
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
    const router = useRouter();
    
    return (
        <button
        onClick={() => router.push(`/watch/${movieId}`)}
            className="
                bg-white
                rounded-md
                py-1 md:py-2
                px-2 md:px-4
                w-auto
                text-xs lg:text-lg
                font-semibold
                flex
                flex-row
                items-center
                hover:bg-neutral-300
                transition
            "
        >
            <TbPlayerPlayFilled size={15} className='mr-1'/>
            play
        </button>
    )
}

export default PlayButton;