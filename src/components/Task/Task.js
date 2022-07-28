import React, { useEffect } from 'react'
import { defaultProfile } from '../../../public/icons';
import { nav_options, taskLists } from '../../constants';
import { useTask } from './useTask'
import Image from 'next/image';
import List from '../List/List';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../../utils/features/taskSlice';



function Task() {
    
    // access task related data from task store
    const {todoCount, inProgressCount, completedCount} = useSelector((state) => state.tasks);
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
                            {/* to do list */}
                            <article className='bg-[#f5f9f9] w-[30%] rounded-2xl'>
                                <div className='pt-5 px-5 w-full h-full flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-poppins font-medium text-sm'>To do</span>
                                        <span className=' w-6 h-6 rounded-lg bg-[#ecf3f3] text-center text-[#329c89] text-sm font-medium'>{todoCount}</span>
                                    </div>
                                    <button className='w-full h-9 rounded-lg bg-[#ecf3f3] text-[#329c89]'>+</button>
                                    <List listType={taskLists.TODO} />
                                </div>
                            </article>
                            {/* in progress list */}
                            <article className='bg-[#f5f9f9] w-[30%] rounded-2xl'>
                                <div className='pt-5 px-5 w-full h-full flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-poppins font-medium text-sm'>In Progress</span>
                                        <span className=' w-6 h-6 rounded-lg bg-[#ecf3f3] text-center text-[#329c89] text-sm font-medium'>{inProgressCount}</span>
                                    </div>
                                    <button className='w-full h-9 rounded-lg bg-[#ecf3f3] text-[#329c89]'>+</button>
                                    <List listType={taskLists.INPROGRESS}/>
                                </div>
                            </article>
                            {/* completed list */}
                            <article className='bg-[#f5f9f9] w-[30%] rounded-2xl'>
                                <div className='pt-5 px-5 w-full h-full flex flex-col gap-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-poppins font-medium text-sm'>Completed</span>
                                        <span className=' w-6 h-6 rounded-lg bg-[#ecf3f3] text-center text-[#329c89] text-sm font-medium'>{completedCount}</span>
                                    </div>
                                    <button className='w-full h-9 rounded-lg bg-[#ecf3f3] text-[#329c89]'>+</button>
                                    <List listType={taskLists.COMPLETED}/>
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