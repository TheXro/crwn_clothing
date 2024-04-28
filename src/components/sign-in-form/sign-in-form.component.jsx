import { React, useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.component.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};
import FormInput from "../form-input/form-input.component";
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //   console.log(formFields);
  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong password");
          break;
        case "auth/user-not-found":
          alert("User not found");
          break;
        case "auth/invalid-credential":
          alert("Invalid credential");
          break;
        default:
          console.log(error);
      }
    }
    resetFormFields();
  };

  const signInWtihGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <div className='sign-in-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handelSubmit}>
          <FormInput
            label='Email'
            type='email'
            onChange={handleChanges}
            name='email'
            value={email}
            required
          />

          <FormInput
            label='Password'
            type='password'
            onChange={handleChanges}
            name='password'
            value={password}
            required
          />
          <div className='buttons-container'>
            <Button type='submit'>Sign In</Button>

            <Button
              type='button'
              buttonType='google'
              onClick={signInWtihGoogle}
            >
              Google SignIn
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
