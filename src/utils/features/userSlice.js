import { createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { STATUSES } from '../../constants';
import { auth } from '../firebase';

const initialState = {
    userName: null,
    userEmail: null,
    userUid: null,
    status : STATUSES.IDLE,
    rememberMe: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatus: (state, action) => {state.status = action.payload},
    setRememberMe: (state, action) => {state.rememberMe = action.payload},
    setActiveUser: (state, action) => {
        state.userName = action.payload.displayName;
        state.userUid = action.payload.uid;
        state.userEmail = action.payload.email;
    },
  }
});

// signin thunk to register the user
export function addUser(name, email, password){
    return async function addUserThunk(dispatch){
        try{
            dispatch(setStatus(STATUSES.LOADING));
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, {displayName: name});
            dispatch(setActiveUser(user));
            console.log(user);
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch(err){
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

export const {setStatus, setActiveUser, setRememberMe} = userSlice.actions

export default userSlice.reducer