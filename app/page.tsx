'use client';
// import { NextPageContext } from 'next'
import React, { } from 'react'
import { useSession } from 'next-auth/react'
import { Billboard, InfoModal, MovieList, Navbar } from './components';
import { useFavorites, useInfoModalStore, useMovieList } from './hooks';
import { redirect } from 'next/navigation';

export default function Home () {
  const { } = useSession({
    required: true,
    onUnauthenticated () {
      redirect('/auth')
    }
  })

  const { isOpen, closeModal } = useInfoModalStore();
  const { data: movies = [], isLoading: isLoadingMoive } = useMovieList();
  const { data: favorites = [], isLoading: isLoadingFavorites } = useFavorites();
  return (
    <main className=''>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pt-40'>

        {
          isLoadingMoive === false && movies && <>
            <p className='text-4xl text-white'>
              Movie list
            </p>
            <MovieList title="Trending Now" data={movies} />
          </>
        }
        {
          isLoadingFavorites === false && favorites && <>
            <p className='text-4xl text-white'>
              Favorites list
            </p>
            <MovieList title="Trending Now" data={favorites} />
          </>
        }

      </div>

    </main>
  )
}
