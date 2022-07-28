import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export const useTask = () => {
    // dispatch object to dispatch action to redux store
    const dispatch = useDispatch();
    // selectorHook to access redux store state
    const { activeOption } = useSelector((state) => state.navbar);
    const { userName } = useSelector((state) => state.user);
    // state to maintain active + option
    const [activeEditOption, setActiveEditOption] = useState({current: '', previous: ''});

    // handle plus button click
    const handlePlusOptionClick = (option) =>{
        if(option == activeEditOption.previous)
            setActiveEditOption({current: '', previous: ''});
        else    
            setActiveEditOption({current: option, previous: option});
    }

    return {
        activeOption,
        userName,
        activeEditOption,
        handlePlusOptionClick,
        setActiveEditOption
    }
}