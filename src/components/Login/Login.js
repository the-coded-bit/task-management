import React, { useEffect } from 'react'
import { eye, eyefill } from '../../../public/icons';
import { optionsList, signinFields, signinOptions } from '../../constants'
import { useLogin } from './useLogin'
import Image from 'next/image'

function Login() {
    // useLogin is custom hook to abstract the logic from ui component Login.
    const {
        activeAuthOption,
        handleChangeAuthOption,
        passwordType,
        togglePassword,
        handleChanges,
        handleSignIn,
        toggleCheckbox,
        handleLogIn,
        email, password, fullName, warning
    } = useLogin();
    // apply styles when user selects any auth option
    const styles = {
        color: ' #1A3B58',
        fontWeight: 500
    }

    return (
        <>
            {/* auth options login/signup */}
            <div className='flex gap-6 mb-9'>
                {
                    optionsList.map(item =>
                        <div className=' font-poppins text-2xl text-[#abb7c1] cursor-pointer'
                            style={activeAuthOption == item ? styles : {}}
                            key={item}
                            onClick={() => handleChangeAuthOption(item)}>
                            {item}
                            <hr className=' border-b-[3px] mt-1 w-[17px] border-primary' style={activeAuthOption == item ? {} : { display: 'none' }}></hr>
                        </div>
                    )
                }
            </div>

            {/* optional rendering on the basis of chosen auth option by default it will show log in field details*/}
            <div className=' mx-16 flex flex-col gap-6'>
                <hr className='border-t-2 border-solid border-[rgba(64, 145, 223, 0.12)]'></hr>
                {
                    activeAuthOption == signinOptions.LOGIN ?
                        <div className='flex flex-col gap-6'>
                            {/* to continue */}
                            <div>
                                <h3 className='font-poppins font-medium text-primary'>To Continue</h3>
                                <p className='text-[10px] font-light text-[#999999]'>We need your Name & Email</p>
                            </div>
                            {/* email input box */}
                            <input
                                type='text'
                                value={email}
                                placeholder='Email'
                                spellCheck={false}
                                onChange={(e) => handleChanges(e, signinFields.EMAIL)}
                                className='border-[1px] border-solid border-border rounded-lg outline-none p-[8px] placeholder:font-poppins placeholder:text-sm placeholder:font-light'
                            />
                            {/* password input box */}
                            <div className='flex flex-row border-[1px] border-solid border-border rounded-lg items-center justify-evenly'>
                                <input
                                    type={passwordType}
                                    placeholder='Password'
                                    onChange={(e) => handleChanges(e, signinFields.PASSWORD)}
                                    className='outline-none p-[8px] placeholder:font-poppins placeholder:text-sm placeholder:font-light'
                                />
                                {
                                    passwordType == 'password' ?
                                        <Image src={eyefill} layout='fixed' className='cursor-pointer' onClick={() => togglePassword()} /> :
                                        <Image src={eye} layout='fixed' className='cursor-pointer' onClick={() => togglePassword()} />
                                }
                            </div>
                            {/* warning if applicable */}
                            {warning.show == true && <span>{warning.error}</span>}
                            {/* Login button */}
                            <button className='w-full h-11 bg-buttoncolor rounded-lg font-poppins font-bold text-[#ffffff] text-sm' disabled={warning.show || email == '' || password == ''}  onClick={() => handleLogIn()}>Log In</button>
                            {/* remember me checkbox */}
                            <label className='flex items-baseline justify-start gap-2' onChange={(e) => toggleCheckbox(e)}>
                                <input type='checkbox' className=' accent-buttoncolor' />
                                <span className='font-poppins font-thin text-sm text-primary'>Remember me</span>
                            </label>
                        </div>
                        :
                        <div className='flex flex-col gap-6'>
                            {/* Full name input box */}
                            <input
                                type='text'
                                placeholder='Full Name'
                                spellCheck={false}
                                onChange={(e) => handleChanges(e, signinFields.FULLNAME)}
                                className='border-[1px] border-solid border-border rounded-lg outline-none p-[8px] placeholder:font-poppins placeholder:text-sm placeholder:font-light'
                            />
                            {/* email input box */}
                            <input
                                type='text'
                                placeholder='Email'
                                spellCheck={false}
                                onChange={(e) => handleChanges(e, signinFields.EMAIL)}
                                className='border-[1px] border-solid border-border rounded-lg outline-none p-[8px] placeholder:font-poppins placeholder:text-sm placeholder:font-light'
                            />
                            {/* password input box */}
                            <div className='flex flex-row border-[1px] border-solid border-border rounded-lg items-center justify-evenly'>
                                <input
                                    type={passwordType}
                                    placeholder='Password'
                                    onChange={(e) => handleChanges(e, signinFields.PASSWORD)}
                                    className='outline-none p-[8px] placeholder:font-poppins placeholder:text-sm placeholder:font-light'
                                />
                                {
                                    passwordType == 'password' ?
                                        <Image src={eyefill} layout='fixed' className='cursor-pointer' onClick={() => togglePassword()} /> :
                                        <Image src={eye} layout='fixed' className='cursor-pointer' onClick={() => togglePassword()} />
                                }
                            </div>
                            {/* warning if applicable */}
                            {warning.show == true && <span>{warning.error}</span>}
                            {/* Login button */}
                            <button
                                className='w-full h-11 bg-buttoncolor rounded-lg font-poppins font-bold text-[#ffffff] text-sm'
                                onClick={() => handleSignIn()}
                                disabled={warning.show || (fullName == '' || email == '' || password == '')}>{signinOptions.SIGNUP}
                            </button>
                            {/* remember me checkbox */}
                            <label className='flex items-baseline justify-start gap-2' onChange={(e) => toggleCheckbox(e)}>
                                <input type='checkbox' className=' accent-buttoncolor' />
                                <span className='font-poppins font-thin text-sm text-primary'>Remember me</span>
                            </label>
                        </div>
                }
            </div>
        </>

    )
}

export default Login