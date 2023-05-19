import AccountMenu from "./AccountMenu";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";

import {useState, useCallback, useEffect} from "react";
import {TbCircleChevronsDown, TbSearch, TbBellRinging} from 'react-icons/tb';

//con esto vamos a hacer un difuniado cuando hacemos scroll
const TOP_OFFSET = 66;

const NavBar = () => {
    
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    //aqui hacemos la funcion para cuando hacemos scroll de nuestra aplicacion
    useEffect(() => {
        const handleScroll = () => {
            if (window.screenY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    

    //aqui vamos a mostrar nuestro menu si esta en moviles
    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, [])

    //aqui vamos a mostrar nuestro menu de la cuenta si esta en moviles
    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, [])
    
    return (
        <nav className="w-full fixed z-40">
            <div 
                className={`
                    px-4
                    md:px-16
                    py-6
                    flex
                    flex-row
                    items-center
                    transition
                    duration-500
                    ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
                `}
            >
                <img className= "h-6 lg:h-7" src="/image/logo.png" alt="logo" />
                <div 
                    className="
                        flex-row
                        ml-8
                        gap-7
                        hidden
                        lg:flex
                    "
                >
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="My list" />
                    <NavbarItem label="Browse by languages" />
                </div>
                <div 
                    onClick={toggleMobileMenu}
                    className="
                        lg:hidden
                        flex
                        flex-row
                        items-center
                        gap-2
                        ml-8
                        cursor-pointer
                        relative
                    "
                >
                    <p className="text-white text-sm">
                        Browse
                    </p>
                    <TbCircleChevronsDown
                        className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0' }`}
                    />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <TbSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <TbBellRinging />
                    </div>
                    
                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            gap-2
                            cursor-pointer
                            relative
                            "
                        >
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img className= "h-6 lg:h-7" src="/image/default-slate.png" alt="logo" />
                        </div>
                        <div
                            onClick={toggleAccountMenu}
                        >
                            <TbCircleChevronsDown
                                className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0' }`}
                            />
                            <AccountMenu visible={showAccountMenu}/>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default NavBar;