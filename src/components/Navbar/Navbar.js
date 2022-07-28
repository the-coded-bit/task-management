import Image from 'next/image';
import React from 'react';
import { calendar, chat, overview, projects, stats, logout } from '../../../public/icons';
import { nav_options } from '../../constants';
import { useNavbar } from './useNavbar';


function Navbar() {

    const { activeOption, allOptions, handleNavOptionChange, handleLogout } = useNavbar();
    return (
        <div className='mt-12 ml-12'>
            <h1 className='font-poppins font-medium text-xl text-[#161616] mb-20'>.taskez</h1>
            <nav className='flex flex-col gap-9'>
                {
                    allOptions.map(
                        item => {
                            var src;
                            switch (item) {
                                case nav_options.STATS:
                                    src = stats;
                                    break;
                                case nav_options.OVERVIEW:
                                    src = overview;
                                    break;
                                case nav_options.CALENDAR:
                                    src = calendar;
                                    break;
                                case nav_options.CHAT:
                                    src = chat;
                                    break;
                                case nav_options.PROJECTS:
                                    src = projects;
                                    break;                
                            }
                            return (
                                <div className='text-start cursor-pointer' 
                                key={item}  
                                style={activeOption == item ?{color: 'black', fill: 'black', borderRight: '4px solid #329C89'}: { color: '#9a9a9a'}}
                                onClick={() => handleNavOptionChange(item)}>
                                    <Image src={src} layout='fixed' style={{fill: 'black'}}/>
                                    <span className='mx-4 font-poppins font-normal'>{item}</span>
                                </div>
                            )
                        }
                    )
                }
                <div className='text-start mt-28 cursor-pointer' onClick={() => handleLogout()}>
                    <Image src={logout} layout='fixed'/>
                    <span className='mx-4 font-poppins font-normal'>Log Out</span>
                    </div>
            </nav>
        </div>
    )
}

export default Navbar