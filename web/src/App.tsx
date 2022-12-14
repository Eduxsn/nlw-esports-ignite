import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg'

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/Form/CreateAdModal';
import axios from 'axios';
import { GamePictureCarrousel } from './components/Slider/GamePictureCarrousel';

export interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}


function App() {
  const [games, setGames] = useState<GameProps[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-20">
      <img src={logoImg}/>

      <h1 className="text-6xl text-white font-black mb-10 mt-20">
        Seu <span className="text-transparent bg-clip-text bg-nlw-gradient">duo</span> está aqui.
      </h1>

      <GamePictureCarrousel />

      {/* OLD GAMES LIST

      <div className="grid grid-cols-6 gap-6 mt-16">

        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
        
      </div> */}

      <Dialog.Root>

        <CreateAdBanner />
        <CreateAdModal />

      </Dialog.Root>

    </div>
  )
}

export default App
