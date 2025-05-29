import React from 'react'
import { Outlet } from 'react-router'

const adminlayout = () => {
  return (
    <div className='admin-layout'>
        Mobile SideBar
        <aside className='w-full max-w-[270px] hidden lg:block'>Sidebar</aside>
        <aside className='children'>
            <Outlet />
        </aside>
    </div>
  )
}

export default adminlayout