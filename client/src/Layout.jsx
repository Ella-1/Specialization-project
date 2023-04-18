import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='p-4 py-8 flex flex-col min-h-screen'>
        <Header />
        {/* outlet allow us maintain the same design in other files */}
        <Outlet /> 
    </div>
  )
}
