'use client'
import Axios from 'axios'
import { dosis, concert_One } from '@/app/fonts'
import { Player, usePlayer } from '../context'
import { useState, ChangeEvent } from 'react'

export const updateAndSavePlayer = async (newPlayer: Player) => {
    const res = await Axios.post('/api/updatePlayer', { newPlayer })

    const data = await res.data;
    console.log(data.message);
};

export const removeAndSavePlayer = async (id: string) => {
    try {
        const res = await Axios.delete(`/api/removePlayer?id=${id}`)
        console.log(res.data.message)
    } catch (error) {
        console.error('Error while removing player:', error)
    }
};

export const clearAndSavePlayer = async () => {
    try {
        const res = await Axios.delete(`/api/clearPlayer`)
        console.log(res.data.message)
    } catch (error) {
        console.error('Error while clearing player:', error)
    }
};

export const addAndSavePlayer = async (newPlayer: Player) => {
    const res = await Axios.post('/api/addPlayer', { newPlayer })

    const data = await res.data;
    console.log(data.message);
};

export default function PlayerItem(props: { player: Player }) {

    const { removePlayer, updatePlayer, state } = usePlayer()

    const { player } = props

    const [toggle, setToggle] = useState(false)
    const [rk, setRanking] = useState<number>(player.ranking)
    const [name, setName] = useState(player.name)
    const [school, setSchool] = useState(player.school)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'rk': {
                if (Number(Number(e.target.value) === 0 || isNaN(Number(e.target.value)))) {
                    setRanking(1)
                } else if (Number(Number(e.target.value) > state.players.length)) {
                    setRanking(state.players.length)
                } else {
                    setRanking(Number(e.target.value))
                }
                break
            }
            case 'name': setName(e.target.value)
                break
            case 'school': setSchool(e.target.value)
                break
        }
    }

    return (
        <div className="flex border-0 rounded-md shadow-md mb-1 text-xl p-4 text-black">
            {toggle ? <input onChange={handleChange} type="text" id="rk" name="rk" value={rk} className="w-[70px] outline-none border-[1px] border-gray-800 mr-1" /> : <p className="w-[150px] font-bold">
                {player.ranking}
            </p>}

            {toggle ? <input onChange={handleChange} type="text" id="name" name="name" value={name} className={`w-full outline-none border-[1px] text-black border-gray-800 mr-1`} /> : <p className={`w-full ${dosis.className} font-bold truncate ... `}>
                {player.name}
            </p>}

            {toggle ? <input onChange={handleChange} type="text" id="school" name="school" value={school} className={`w-[140px] outline-none border-[1px] border-gray-800 text-black mr-1`} /> : <p className={`w-[300px] ${concert_One.className}`}>
                {player.school}
            </p>}

            <button onClick={() => { setToggle(!toggle); if (toggle) { updatePlayer({ id: player.id, name, school, ranking: rk }); updateAndSavePlayer({ id: player.id, name, school, ranking: rk }) } }} className='text-sm rounded-md bg-sky-500 p-1 text-white shadow-sm shadow-slate-700'>{toggle ? "Save" : "Edit"}</button>
            <button onClick={() => { removePlayer(player.id); removeAndSavePlayer(player.id) }} className='text-sm rounded-md bg-red-500 p-1 text-white ml-1 shadow-sm shadow-slate-700'>Remove</button>
        </div>
    );
}
