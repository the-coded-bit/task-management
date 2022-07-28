import { createSlice } from '@reduxjs/toolkit'
import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { STATUSES } from '../../constants';
import { auth } from '../firebase';

const initialState = {
    userName: null,
    userEmail: null,
    userUid: null,
    status: STATUSES.IDLE,
    rememberMe: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setStatus: (state, action) => { state.status = action.payload },
        setRememberMe: (state, action) => { state.rememberMe = action.payload },
        setActiveUser: (state, action) => {
            state.userName = action.payload.displayName;
            state.userUid = action.payload.uid;
            state.userEmail = action.payload.email;
        },
    }
});

// signin thunk to register the user
export function addUser(name, email, password) {
    return async function addUserThunk(dispatch, getState) {
        const { rememberMe } = getState().user;
        console.log(rememberMe);
        try {
            dispatch(setStatus(STATUSES.LOADING));
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, { displayName: name });
            await signInWithEmailAndPassword(auth, email, password);
            // if remember me is non-checked the user will be signedOut as soon as he closes the tab.
            if (!rememberMe) {
                await setPersistence(auth, browserSessionPersistence);
            }
            dispatch(setActiveUser(user));
            console.log(user);
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

// login thunk to login to existing system with credentials
export function logInUser(email, password) {
    return async function logInUserThunk(dispatch, getState) {
        const { rememberMe } = getState().user;
        try {
            dispatch(setStatus(STATUSES.LOADING));
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            // if remember me is non-checked the user will be signedOut as soon as he closes the tab.
            if (!rememberMe) {
                await setPersistence(auth, browserSessionPersistence);
            }
            dispatch(setActiveUser(user));
            dispatch(setStatus(STATUSES.SUCCESS));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

// logout thunk
export function logout(){
    return async function logoutThunk(dispatch){
        try{
            dispatch(setStatus(STATUSES.LOADING));
            await signOut(auth);
            dispatch(setActiveUser({displayName: null, email: null, uid: null}));
            dispatch(setStatus(STATUSES.IDLE));
        } catch(err){
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    }
}

export const { setStatus, setActiveUser, setRememberMe } = userSlice.actions

export default userSlice.reducer