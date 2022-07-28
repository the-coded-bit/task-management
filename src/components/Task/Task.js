import React from 'react'
import { defaultProfile } from '../../../public/icons';
import { nav_options } from '../../constants';
import { useTask } from './useTask'
import Image from 'next/image';

function Task() {
    const { activeOption, userName } = useTask();
    return (
        <div className='h-full w-full px-16 pt-12'>
            {
                activeOption == nav_options.PROJECTS ?
                    <div className='h-full w-full'>
                        <header className='flex  justify-end items-center gap-5 h-[10%]'>
                            {/* using split method to extract first name of user not full name */}
                            <span className='font-poppins font-normal text-[#3a3a3a] tracking-wider'>Hi {userName.split(' ')[0]}</span>
                            <Image src={defaultProfile} layout='fixed' width={40} height={40} />
                        </header>
                        <h1 className='font-poppins font-medium tracking-wider text-primary text-lg h-[10%]'>Projects</h1>
                        <section className='flex gap-10 h-[80%]'>
                            <article className='bg-[#f5f9f9] w-[30%] rounded-2xl'>
                                <div className='pt-5 px-5 w-full h-full flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-poppins font-medium text-sm'>To do</span>
                                        <span className=' w-6 h-6 rounded-lg bg-[#ecf3f3] text-center text-[#329c89] text-sm font-medium'>2</span>
                                    </div>
                                    <button className='w-full h-9 rounded-lg bg-[#ecf3f3] text-[#329c89]'>+</button>
                                </div>
                            </article>
                            <article className='bg-[#f5f9f9] w-[30%] rounded-2xl'>
                                <div className='pt-5 px-5 w-full h-full flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-poppins font-medium text-sm'>In Progress</span>
                                        <span className=' w-6 h-6 rounded-lg bg-[#ecf3f3] text-center text-[#329c89] text-sm font-medium'>2</span>
                                    </div>
                                    <button className='w-full h-9 rounded-lg bg-[#ecf3f3] text-[#329c89]'>+</button>
                                </div>
                            </article>
                            <article className='bg-[#f5f9f9] w-[30%] rounded-2xl'>
                                <div className='pt-5 px-5 w-full h-full flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-poppins font-medium text-sm'>Completed</span>
                                        <span className=' w-6 h-6 rounded-lg bg-[#ecf3f3] text-center text-[#329c89] text-sm font-medium'>2</span>
                                    </div>
                                    <button className='w-full h-9 rounded-lg bg-[#ecf3f3] text-[#329c89]'>+</button>
                                </div>
                            </article>
                        </section>
                    </div>
                    : <div>{activeOption}</div>
            }
        </div>
    )
}

export default Task