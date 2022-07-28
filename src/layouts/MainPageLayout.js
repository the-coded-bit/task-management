import React from 'react'
import { Navbar, Task } from '../components'

function MainPageLayout() {
  return (
    <div className='flex w-full h-full'>
        <aside className='bg-red-100 w-[20%]'>
            <Navbar />
        </aside>
        <section className='bg-green-100 w-[80%]'>
            <Task />
        </section>
    </div>
  )
}

export default MainPageLayout