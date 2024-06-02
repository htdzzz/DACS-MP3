import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink, useSearchParams } from 'react-router-dom'
import { searchMenu } from '../../ultis/menu'
import { useSelector } from 'react-redux'

const notActiveStyle = 'px-4 hover:text-main-500 font-semibold cursor-pointer'
const activeStyle = 'px-4 hover:text-main-500 font-semibold cursor-pointer border-b-2 border-green-900 text-main-500 h-[52px] flex items-center'

const Search = () => {
    const { keyword } = useSelector(state => state.music)
    return (
        <div className='w-full'>
            <div className='flex h-[50px] mb-7 items-center text-sm border-b pl-[60px] pb-1 mt-20'>                      
                <span className='text-[24px] font-bold pr-6 border-r '>Kết quả tìm kiếm</span>
                <div className='flex items-center'>
                    {searchMenu.map(item => (
                        <NavLink
                            key={item.path}
                            to={`${item.path}?q=${keyword.replace(' ', '+')}`}
                            className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='w-full'>
                <Outlet />
            </div>
            <div className='w-full h-[120px]'></div>
        </div>
    )
}

export default Search