import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setActiveOption } from '../../utils/features/navSlice';
import { logout } from '../../utils/features/userSlice';


export const useNavbar = () =>{
    // grab the dispatch function
    const dispatch = useDispatch();
    // grab navbar states
    const {activeOption, allOptions} = useSelector((state) => state.navbar);

    // handle nav option change click
    const handleNavOptionChange = (option) =>{
        dispatch(setActiveOption(option))
    }

    // handle logout click
    const handleLogout = () =>{
        dispatch(logout());
    }
    return {
        activeOption,
        allOptions,
        handleNavOptionChange,
        handleLogout
    }
}