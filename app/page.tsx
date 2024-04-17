'use client'
import { raleway, dosis, exo, concert_One } from '@/app/fonts'
import Logo from '@/public/assets/logo3.svg'
import { usePlayer } from './context'
import { useEffect } from 'react'
// import Axios from 'axios'

export default function Home() {
  const { state, setPlayers } = usePlayer();
  const { players } = state;

  useEffect(() => {
    fetch(`/api/getAllPlayer`,
      { cache: 'no-store' }
    )
      .then(res => res.json())
      .then(data => {
        setPlayers(data.data)
      })
      .catch(error => {
        console.error('Error while reading player:', error)
      })
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-white">
      <div className={`fixed flex justify-center items-center top-0 w-full p-4 bg-black text-5xl text-center font-bold text-[rgb(213,170,87)] ${exo.className}`}>
        <div className='w-32 min-w-32'>
          <Logo />
        </div>
        <span>SUMMER RANKING 2024</span>
      </div>
      <div className="max-w-lg w-full">
        <div className={`sticky top-[175px] flex border-0 rounded-md shadow-md mb-1 bg-[rgb(213,170,87)] text-red-800 text-xl ${raleway.className} p-4 mt-[175px] uppercase font-extrabold`}>
          <p className="w-[150px]">
            Rk
          </p>
          <p className="w-full">
            Player
          </p>
          <p className="w-[300px]">
            School
          </p>
        </div>
        {players?.length > 0 && players.sort((a, b) => a.ranking - b.ranking).map((player) => <div key={player.id} className="flex border-0 rounded-md shadow-md mb-1 text-xl p-4 text-black">
          <p className="w-[150px] font-bold ">
            {player.ranking}
          </p>
          <p className={`w-full ${dosis.className} font-bold truncate ... `}>
            {player.name}
          </p>
          <p className={`w-[300px] ${concert_One.className} `}>
            {player.school}
          </p>
        </div>)}
      </div>
    </main>
  );
}
