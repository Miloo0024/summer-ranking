'use client'
import * as uuid from 'uuid'
// import { raleway, exo } from '@/app/fonts'
import { usePlayer } from '../context'
import Logo from '@/public/assets/logo3.svg'
import PlayerItem, { addAndSavePlayer, clearAndSavePlayer } from '../components/PlayerItem'
import { useState, ChangeEvent, useEffect } from 'react'
// import Axios from 'axios'
export default function Home() {

  const { state, clearPlayer, addPlayer, setPlayers } = usePlayer()
  const { players } = state

  useEffect(() => {
    fetch(`/api/getAllPlayer`,
      { cache: 'no-store' }
    )
      .then(res => res.json())
      .then(data => {
        setPlayers(data.data)
      }).catch(error => {
        console.error('Error while getting player:', error)
      })
  }, [])

  const [isOpen, setOpen] = useState(false)
  const [rk, setRanking] = useState<number>(0)
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'Rk': setRanking(Number(e.target.value))
        break
      case 'name': setName(e.target.value)
        break
      case 'school': setSchool(e.target.value)
        break
    }
  }

  const handleSave = () => {
    if (name === '' || school === '') return
    const newPlayer = { id: uuid.v4(), name, school, ranking: rk }
    addPlayer(newPlayer)

    addAndSavePlayer(newPlayer)

    setOpen(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-white">
      <div className={`fixed flex justify-center items-center top-0 w-full bg-black text-5xl text-center font-bold text-[rgb(213,170,87)] p-4`}>
        <div className='w-32 min-w-32'>
          <Logo />
        </div>
        <span className='font-[Impact] font-light'>SUMMER RANKING 2024</span>
      </div>
      <div className="max-w-lg w-full">
        <div className={`sticky top-[175px] flex border-0 rounded-md shadow-md mb-1 bg-[rgb(213,170,87)] text-rose-700 text-xl p-4 mt-[175px] uppercase font-extrabold`}>
          <p className="w-[160px]">
            Rk
          </p>
          <p className="w-full">
            Player
          </p>
          <p className="w-[300px]">
            School
          </p>

          <button onClick={() => { setOpen(true); setRanking(players.length + 1); setName(''); setSchool('') }} className='text-sm rounded-md bg-sky-500 p-1 text-white mr-1 font-normal shadow-sm shadow-slate-700'>Add</button>
          <button onClick={() => { clearPlayer(); clearAndSavePlayer() }} className='text-sm rounded-md bg-red-500 p-1 text-white font-normal shadow-sm shadow-slate-700'>ClearAll</button>
        </div>
        {isOpen ? <div className="flex border-0 rounded-md shadow-md mb-1 text-lg p-4 text-black">
          <p className="w-[150px] font-bold">
            {rk}
          </p>
          <input onChange={handleChange} placeholder="player name" type="text" id="name" name="name" value={name} className={`w-full font-normal outline-none border-[1px] border-gray-800 mr-1`} />

          <input onChange={handleChange} placeholder='school' type="text" id="school" name="school" value={school} className={`w-[140px] font-normal outline-none border-[1px] border-gray-800 mr-1`} />

          <button onClick={handleSave} className='text-sm rounded-md bg-sky-500 p-1 text-white mr-1 shadow-sm shadow-slate-700'>Save</button>
          <button onClick={() => { setOpen(false) }} className='text-sm rounded-md bg-sky-500 p-1 text-white shadow-sm shadow-slate-700'>Cancel</button>
        </div> : ''}
        {players.length > 0 && players.sort((a, b) => a.ranking - b.ranking).map((player) => <PlayerItem key={player.id} player={player} />)}
      </div>
    </main>
  );
}
