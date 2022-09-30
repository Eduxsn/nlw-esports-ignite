import React, { useEffect, useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import axios from 'axios'
import { GameBanner } from '../GameBanner';
import { ArrowLeft, ArrowRight, CaretLeft, CaretRight } from 'phosphor-react';

interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

export function GamePictureCarrousel() {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [games, setGames] = useState<Game[]>([])
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 1,
            slides: {
                perView: 5,
                spacing: 15
            },
            created() {
                setLoaded(true)
            },
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
        },
    )



    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    console.log(currentSlide)

    return (
        <>
            <div className="navigation-wrapper w-full box-border">
                <div ref={sliderRef} className="keen-slider">
                    {games.map(game => {
                        return(
                            <div className="keen-slider__slide number-slide content-center">
                                <GameBanner
                                    key={game.id}
                                    bannerUrl={game.bannerUrl}
                                    title={game.title}
                                    adsCount={game._count.ads}
                                />
                            </div>
                        )
                    })}
                </div>
                {loaded && instanceRef.current && (
                            <>
                                <CaretLeft
                                    className='flex items-center absolute overflow-visible top-[40%] mx-2 p-2 bg-zinc-300 bg-opacity-80 rounded-full hover:cursor-pointer hover:bg-opacity-100 transition ease-in-out duration-700 '
                                    size={50}
                                    color='#8b5cf6'
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.prev()
                                    }
                                />
                                <CaretRight
                                    className='flex items-center absolute overflow-visible mx-2 p-2 bg-zinc-300 bg-opacity-80 rounded-full hover:cursor-pointer'
                                    size={50}
                                    color='#8b5cf6'
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.next()
                                    }
                                />
                            </>
                        )}
            </div>
        </>
    )


}