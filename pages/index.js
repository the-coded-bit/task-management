import Head from 'next/head'
import LoginLayout from '../src/layouts/LoginLayout'
import PageLayout from '../src/layouts/PageLayout'
import { auth } from '../src/utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUser } from '../src/utils/features/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

export default function Home() {
  //  useDispatch hook
  const dispatch = useDispatch();
  // using use selector hook to access redux store states
  const { userUid } = useSelector((state) => state.user);


  // attach auth state change listener as soon as component mounts
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // if user is present attach that user to redux store
        dispatch(setActiveUser(user));
      }
    })
  }, []);

  return (
    <main>
      <PageLayout style={'bg-[#ffffff] w-screen h-screen'}>
        {
          userUid == null ? <LoginLayout /> : <div>main page</div>
        }
      </PageLayout>
    </main>
  )
}
