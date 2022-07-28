import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export const useTask = () => {
    // dispatch object to dispatch action to redux store
    const dispatch = useDispatch();
    // selectorHook to access redux store state
    const { activeOption } = useSelector((state) => state.navbar);
    const { userName } = useSelector((state) => state.user);
    return {
        activeOption,
        userName
    }
}