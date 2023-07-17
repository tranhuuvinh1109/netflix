'use client';
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { Billboard, InfoModal, MovieList, Navbar } from './components';
import { useCurrentUser, useFavorites, useInfoModalStore, useMovieList } from './hooks';
export async function getServerSideProps (context: NextPageContext) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
export default function Home () {
  const { isOpen, closeModal } = useInfoModalStore();

  const { data: user } = useCurrentUser()
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  return (
    <main className=''>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pt-40'>
        <p className='text-4xl text-white'>
          Movie list
        </p>
        <MovieList title="Trending Now" data={movies} />
        <p className='text-4xl text-white'>
          Favorites list
        </p>
        <MovieList title="Trending Now" data={favorites} />
      </div>

    </main>
  )
}
