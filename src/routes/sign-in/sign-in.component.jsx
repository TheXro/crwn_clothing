import React from 'react'
import { useEffect } from 'react'
import {  getRedirectResult } from 'firebase/auth'
import { auth,signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import Button from '../../components/button/button.component'

const SignIn = () => {
  useEffect(() => {
    const checkUser = async () => {
      const result = await getRedirectResult(auth);
      // console.log(result);
      if(result){
        const userDocRef = await createUserDocumentFromAuth(result.user);
      }
    }
    checkUser();
  },[])
  const logGoogleUser = async () => {
   const {user} =  await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  const signInWithRedirectUser = async () => {
    const {user} = await signInWithGoogleRedirect();
    console.log(user);
  }
  
  return (
    <>
      <h1>Sign in page</h1>
      <Button buttonType='google'  onClick={logGoogleUser}>Sign in with google</Button>
      <SignUpForm />
    </>
  )
}

export default SignIn