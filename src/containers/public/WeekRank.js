import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import bgChart from '../../assets/week-chart.jpg'
import { RankList } from '../../components'

const notActivedStyle = 'text-[24px] text-black py-[12px] font-semibold'
const activedStyle = 'text-[24px] text-main-500 py-[12px] font-semibold border-b-2 border-[#0E8080]'

const WeekRank = ({ weekChart }) => {


    // console.log(weekChart)

    const { pid } = useParams()
    useEffect(() => {
        // console.log(pid)
    }, [pid])

    return (
        <div>
            <div className='relative'>
                <img src={bgChart} alt="bg-chart" className='w-full h-[500px] object-cover grayscale' />
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.8)]'></div>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#CED9D9] to-transparent'></div>
                <div className='absolute top-0 left-0 right-0 bottom-1/2 flex px-[60px] flex-col gap-4'>
                    <h3 className='font-bold text-[40px] mt-[90px] text-main-500'>Bảng Xếp Hạng Tuần</h3>
                    <div className='flex gap-8'>
                        {weekChart?.map(item => (
                            <NavLink
                                to={item.link.split('.')[0]}
                                className={({ isActive }) => isActive ? activedStyle : notActivedStyle}
                                key={item.chartId}
                            >
                                {item.country === 'vn' ? 'VIỆT NAM' : item.country === 'us' ? 'US-UK' : item.country === 'korea' ? 'K-POP' : ''}
                            </NavLink>
                        ))}
                    </div>
                    <div className='pb-8 w-full'>
                        <RankList
                            data={weekChart?.find(item => item?.link?.includes(pid))?.items}
                            number={100}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WeekRank