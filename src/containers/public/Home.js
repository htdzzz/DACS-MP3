import React, { useEffect } from 'react'
import { Section, NewRelease, ChartSection, Artist, Sliders } from '../../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
const Home = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7
    };
    const { friday, newEveryday, top100, xone, newMusic, weekChart, favoritedArtist, singers } = useSelector(state => state.app)


    return (
        <div className='overflow-y-auto w-full'>
            <div className='w-full h-[70px]'></div>
            <Sliders />
            <Section data={friday} />
            <Section data={newEveryday} />
            <NewRelease />
            <Section data={top100} />
            <ChartSection />
            {singers && <div className='px-[43px] w-full mt-12'>
                <Slider {...settings}>
                    {singers?.map(item => (
                        <div key={item.id} className='px-4'>
                            <Artist
                                image={item.thumbnail}
                                follower={item.totalFollow}
                                link={item.link}
                                title={item.name}
                            />
                        </div>
                    ))}
                </Slider>
            </div>}
            <div className='flex items-center px-[43px] w-full mt-12'>
                {weekChart?.map(item => (
                    <Link to={item?.link?.split('.')[0]} key={item.link} className='flex-1 px-4'>
                        <img src={item.cover} alt="cover" className=' w-full object-cover rounded-md' />
                    </Link>
                ))}
            </div>

            {favoritedArtist && <div className='mt-12 px-[59px] flex flex-col gap-5'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-[20px] font-bold'>{favoritedArtist?.title}</h3>
                    <span className='text-xs'>TẤT CẢ</span>
                </div>
                <div className='flex mx-[-16px]'>
                    {favoritedArtist?.items?.filter((i, index) => index <= 4).map(singer => {
                        return (
                            <div key={singer.encodeId} className='flex-1 px-4 relative'>
                                <img src={singer.thumbnail} alt="singer" className='w-full object-contain rounded-md' />
                                <div className='absolute w-full bottom-[16px] flex justify-evenly pr-8'>
                                    <img src={singer?.song?.items[0].thumbnail} alt="singer" className='w-[25%] rounded-md object-cover' />
                                    <img src={singer?.song?.items[1].thumbnail} alt="singer" className='w-[25%] rounded-md object-cover' />
                                    <img src={singer?.song?.items[2].thumbnail} alt="singer" className='w-[25%] rounded-md object-cover' />
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>}
            <Section data={xone} />
            <Section data={newMusic} />

            <div className='w-full h-[500px]'></div>
        </div>
    )
}

export default Home