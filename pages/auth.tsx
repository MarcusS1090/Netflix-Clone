//aqui vamos a crear la pestaña de login o sign in
import Input from "@/components/Input";
import { useCallback, useState } from "react";

const Auth = () => {
    //vamos a crear nuestros estados para nuestros inputs
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    //vamos a crear las variables para nuestro metodo toggle
    const [variant, setVariant] = useState('login');

    //con este metodo vamos a ver si el usuario esta en el login o sino que lo
    // redireccione al registro
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    },[])
    return (
        <div className="
                relative
                h-full w-full
                bg-[url('/image/hero.jpg')]
                bg-no-repeat
                bg-center
                bg-fixed bg-cover
                "
            >
                <div className="
                    bg-black
                    w-full
                    h-full
                    lg:bg-opacity-50
                    "
                >
                    <nav className="px-12 py-5">
                        <img src="/image/logo.png" alt="logo" className="h-12" />
                    </nav>
                    <div className="flex justify-center">
                        <div className="
                            bg-black
                            bg-opacity-70
                            px-16
                            py-16
                            self-center
                            mt-2
                            lg:w-2/5
                            lg:max-w-md
                            rounded-md
                            w-full
                            "
                        >
                            <h2 className="
                                text-white
                                text-4xl
                                mb-8
                                font-semibold
                                "
                            >
                                {variant === 'login' ? 'Sign In' : 'Register'}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {variant  === 'register' && (
                                <Input 
                                    label="Username"
                                    onChange={(ev: any)=> setName(ev.target.value)}
                                    id="name"
                                    value={name}
                                />
                                )}
                                <Input 
                                label="Email"
                                onChange={(ev: any)=> setEmail(ev.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input 
                                label="Password"
                                onChange={(ev: any)=> setPassword(ev.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button className="
                            bg-red-600
                            py-3
                            text-white
                            rounded-md
                            w-full
                            mt-10
                            hover:bg-red-900
                            transition
                            "
                        >
                            {variant === 'login' ? 'Login' : 'Sign Up' }
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                            <span
                                onClick={toggleVariant}
                                className="
                                text-white
                                ml-1
                                hover:underline
                                cursor-pointer
                                "
                            >
                                {variant === 'login' ? 'Create an account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;