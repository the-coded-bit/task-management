import React from 'react'

function MainPageLayout() {
  return (
    <div className='flex w-full h-full'>
        <aside className='bg-red-100 w-[20%]'>navbar</aside>
        <section className='bg-green-100 w-[80%]'>task management</section>
    </div>
  )
}

export default MainPageLayout