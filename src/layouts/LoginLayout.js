import React from 'react'
import Image from 'next/image'
import { Login } from '../components'
import { Group } from '../../public/icons'

function LoginLayout() {
    return (
        <section className='flex w-full h-full justify-center items-center gap-11'>
            <article className='h-[50%] w-[30%] flex justify-center items-center'>
                <Image src={Group} layout='fixed' height={420} width={477}/>
            </article>
            <article className='h-[70%] w-[30%] border-2 border-solid rounded-[65px] border-[rgba(26, 59, 88, 0.24)] pl-16 pt-20'>
                <Login />
            </article>
        </section>
    )
}

export default LoginLayout