import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetArtist } from '../../apis'
import icons from '../../ultis/icons'
import { SongItem, Section, Artist } from '../../components'
import { useSelector } from 'react-redux'

const { AiOutlineUserAdd, BsFillPlayFill } = icons
const Singer = () => {
    const { singer } = useParams()
    const [aritstData, setAritstData] = useState(null)
    const [isHoverPlay, setIsHoverPlay] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const fetchArtistData = async () => {
            const res = await apiGetArtist(singer)
            if (res.data.err === 0) {
                setAritstData(res.data.data)
            }
        }
        singer && fetchArtistData()
    }, [singer])
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })

    }, [singer])
    return (
        <div className='flex flex-col w-full '>
            <div ref={ref} className='relative'>
                <img src={aritstData?.cover} alt="background" className='h-[400px] object-cover w-full' />
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] text-white to-transparent px-60px'>
                    <div className='absolute bottom-0 pb-6 px-[60px]'>
                        <div className='flex gap-8 items-center'>
                            <h1 className='text-[60px] font-bold'>{aritstData?.name}</h1>
                            <span
                                className='p-2 relative rounded-full text-main-500 hover:text-gray-100 cursor-pointer bg-white'
                                onMouseEnter={() => setIsHoverPlay(true)}
                                onMouseLeave={() => setIsHoverPlay(false)}
                            >
                                <div className='w-8 h-8'></div>
                                {isHoverPlay && <span className='absolute top-[-1px] animate-scale-up-center left-[-1px] bottom-[-1px] right-[-1px] bg-main-500 rounded-full'></span>}
                                <span className='absolute p-2 top-0 left-0 bottom-0 right-0 z-50'><BsFillPlayFill size={32} /></span>
                            </span>
                        </div>
                        <div className='flex items-center gap-4 mt-4'>
                            <span className='text-sm text-gray-300'>
                                {`${Number(aritstData?.totalFollow.toFixed(1)).toLocaleString()} người quan tâm`}
                            </span>
                            <button
                                type='button'
                                className='bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1'
                            >
                                <span><AiOutlineUserAdd /></span>
                                <span className='text-xs opacity-90'>QUAN TÂM</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-[30px] px-[60px] w-full flex'>
                <div className='w-[40%] flex-auto'>
                    <h3 className='mb-5 font-bold text-[20px]'>Mới nhất</h3>
                    <div className='flex gap-4  p-4 pr-11 bg-[#C4CDCC] rounded-md'>
                        <img src={aritstData?.topAlbum?.thumbnail} alt="thunbnail" className='w-[151px] h-[151px] object-cover rounded-md' />
                        <div className='flex flex-col text-xs gap-[12px] opacity-80 text-black'>
                            <span>{aritstData?.topAlbum?.textType}</span>
                            <div className='flex flex-col'>
                                <span className='text-sm font-bold opacity-100'>{aritstData?.topAlbum?.title}</span>
                                <span>{aritstData?.topAlbum?.artistsNames}</span>
                            </div>
                            <span>{aritstData?.topAlbum?.releaseDate}</span>
                        </div>
                    </div>
                </div>
                <div className='w-[60%] flex-auto pl-6'>
                    <h3 className='mb-5 font-bold text-[20px]'>Bài hát nổi bật</h3>
                    <div className='flex flex-wrap w-full justify-start'>
                        {aritstData?.sections?.find(item => item.sectionType === 'song')?.items?.filter((item, index) => index < 6)?.map(item => (
                            <div key={item.encodeId} className='w-[90%] min-[1024px]:w-[50%]'>
                                <div className='w-[96%] border-b border-gray-400'>
                                    <SongItem
                                        thumbnail={item.thumbnail}
                                        title={item.title}
                                        artists={item.artistsNames}
                                        sid={item.encodeId}
                                        size='w-[40px] h-[40px]'
                                    />
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {aritstData?.sections?.filter(item => item.sectionType === 'playlist')?.map((item, index) => (
                <Section key={index} data={item} />
            ))}
            <div className='flex flex-col w-full px-[60px] mt-12 '>
                <h3 className='text-lg font-bold mb-5'>{aritstData?.sections?.find(item => item.sectionType === "artist")?.title}</h3>
                <div className='flex gap-[28px]'>
                    {aritstData?.sections?.find(item => item.sectionType === "artist")?.items?.map((item) => (
                        <Artist
                            key={item.id}
                            title={item.name}
                            image={item.thumbnailM}
                            follower={item.totalFollow}
                            link={item.link}
                        />
                    ))}
                </div>
            </div>
            <div className='px-[60px] mt-12'>
                <h3 className='text-lg font-bold mb-5'>{`Về ${aritstData?.name}`}</h3>
                <div className='flex gap-8'>
                    <img src={aritstData?.cover} alt="thumbnail" className='w-[45%] flex-none h-[275px] object-cover rounded-md' />
                    <div className='flex flex-col gap-8 text-sm'>
                        <p dangerouslySetInnerHTML={{ __html: aritstData?.biography }}></p>
                        <div className='flex flex-col gap-2'>
                            <span className='text-[20px] font-bold'>{Number(aritstData?.follow?.toFixed(1)).toLocaleString()}</span>
                            <span>Người quan tâm</span>

                        </div>
                    </div>

                </div>

            </div>
            <div className='w-full h-[500px]'></div>

        </div>
    )
}

export default Singer