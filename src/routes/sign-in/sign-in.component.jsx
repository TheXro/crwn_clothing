import React from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  
  const logGoogleUser = async () => {
   const {user} =  await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }
  
  return (
    <>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
    </>
  )
}

export default SignIn