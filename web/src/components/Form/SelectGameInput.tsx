import * as Select from '@radix-ui/react-select';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { InputHTMLAttributes, useEffect, useState } from 'react';
import axios from 'axios';

interface GameTitleList {
    title: string;
    id: string;
}

interface GameSelectedProps {
    onGameSelected: any
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}




export function SelectGameInput({onGameSelected}: GameSelectedProps) {
    const [games, setGames] = useState<GameTitleList[]>([])
    const [gameName, setGameName] = useState("");

    onGameSelected(gameName)

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    
    return(
        <div>
            <Select.Root onValueChange={setGameName}>
                <Select.Trigger className='flex flex-row bg-zinc-900 w-[100%] items-center py-3 px-3 justify-between text-zinc-500 text-sm rounded '>
                    <Select.Value placeholder="Selecione o game que deseja jogar" className='placeholder:text-blue-400' />
                    <Select.Icon>
                        <ChevronDownIcon className='w-6 h-6'/>
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content>
                        <Select.ScrollUpButton>
                            <ChevronUpIcon />
                        </Select.ScrollUpButton>

                        <Select.Viewport className='bg-[#2A2634] w-full mt-3 px-3 py-1 border border-zinc-500 rounded shadow-menu'>
                            <Select.SelectGroup>
                                <Select.SelectLabel className='text-zinc-400 text-sm'>Selecione o que deseja jogar...</Select.SelectLabel>
                                {
                                    games.map(game => {
                                        return (
                                        <Select.SelectItem key={game.id} className='text-zinc-100 hover:cursor-pointer flex items-center hover:bg-violet-600 hover:rounded hover:ml-1 hover:pl-2' value={game.id}>
                                                <Select.SelectItemText >{game.title}</Select.SelectItemText>
                                                <Select.SelectItemIndicator>
                                                    <CheckIcon />
                                                </Select.SelectItemIndicator>
                                            </Select.SelectItem>
                                        )
                                    })
                                }
                            </Select.SelectGroup>

                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    )
}