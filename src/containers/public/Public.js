import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Player, SidebarLeft, SidebarRight, Header, Loading } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions'

const Public = () => {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true)
    const { isLoading, scrollTop } = useSelector(state => state.app)
    const { curSongId } = useSelector(state => state.music)
    const dispatch = useDispatch()
    const handleScrollTop = (e) => {
        if (e.target.scrollTop === 0) {
            dispatch(actions.zeroScrollTop(true))
        } else {
            dispatch(actions.zeroScrollTop(false))
        }
    }
    return (
        <div className='w-full relative h-screen flex flex-col bg-main-300'>
            <div className='w-full h-full flex flex-auto'>
                <div className='min-[1024px]:w-[240px] w-[70px] h-full flex-none'>
                    <SidebarLeft />
                </div>
                <div className='flex-auto relative flex flex-col'>
                    {isLoading && <div className='absolute top-0 bottom-0 z-20 left-0 right-0 bg-main-200 flex items-center justify-center'>
                        <Loading />
                    </div>}
                    <div className={`h-[70px] ${scrollTop ? 'bg-transparent' : 'bg-main-300'} fixed top-0 left-[240px] right-[329px] px-[59px] z-50 flex items-center`}>
                        <Header />
                    </div>

                    <div className='flex-auto w-full'>
                        <Scrollbars
                            onScroll={handleScrollTop}
                            autoHide
                            style={{ width: '100%', height: '100%' }}
                        >
                            <Outlet />
                            <div className='h-[120px] w-full'></div>
                        </Scrollbars>
                    </div>
                </div>
                {isShowRightSidebar && <div className='w-[329px] hidden 1600:flex h-screen flex-none animate-slide-left'>
                    <SidebarRight />
                </div>}
            </div>
            {curSongId && <div className='fixed z-50 bottom-0 left-0 right-0 h-[90px]'>
                <Player setIsShowRightSidebar={setIsShowRightSidebar} />
            </div>}
        </div>
    )
}

export default Public