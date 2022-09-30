import React, { useEffect, useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import axios from 'axios'
import { GameBanner } from '../GameBanner';
import { ArrowLeft, ArrowRight, CaretLeft, CaretRight } from 'phosphor-react';
import { GameProps } from '../../App';


export function GamePictureCarrousel() {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [games, setGames] = useState<GameProps[]>([])
    const [loaded, setLoaded] = useState(false)
    const MutationPlugin = (slider: any) => {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                slider.update()
            })
        })
        const config = { childList: true }
        observer.observe(slider.container, config)
    }
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 5,
                spacing: 15
            },
            loop: true,
            created() {
                setLoaded(true)
            },
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
        },
        [
            MutationPlugin
        ]
    )




    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    return (
        <>
            <div className="navigation-wrapper relative w-full">
                <div ref={sliderRef} className="keen-slider">
                    {games.map(game => {
                        return (
                            <div className="keen-slider__slide rounded-xl">
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
                            className='absolute top-2/4 translate-y-[-50%] cursor-pointer left-1 ml-[-60px] zinc-400'
                            size={50}
                            color='#a1a1aa'
                            onClick={(e: any) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                        />
                        <CaretRight
                            className='absolute top-2/4 translate-y-[-50%] cursor-pointer left-auto right-1 mr-[-60px]'
                            size={50}
                            color='#a1a1aa'
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