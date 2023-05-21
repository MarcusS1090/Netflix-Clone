
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import NavBar from "@/components/NavBar";
import useFavorites from "@/hooks/useFavorites";
import useMovieList from "@/hooks/useMovieList";

import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

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
  //para ver la lista de peliculas
  const { data: movies = [] } = useMovieList();
  //para ver nuestras peliculas favoritas
  const { data: favorites = [] } = useFavorites();
  return (
    <>
      <NavBar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My list" data={favorites}/>
      </div>
      
    </>
  )
}
