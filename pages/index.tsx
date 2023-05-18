
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

//vamos a protger nuestra index page o Home
//con esto verificamos que haya una sesion en curso
export async function getServerSideProps(context: NextPageContext) {
  //vamos a proteger nuestra sesion desde el lado del cliente
  const session = await getSession(context);

  //esto es lo que hara si no hay una sesion, nos redirige a authentificacion page
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <>
      <h1 className="text-2xl text-green-500">Netflix Clone</h1>
      <p className="text-white">Logged in as: {user?.name}</p>
      <button 
        className="h-10 w-full bg-white"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </>
  )
}
