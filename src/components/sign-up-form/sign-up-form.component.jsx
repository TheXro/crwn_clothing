import { React, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./sign-up-form.component.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
import FormInput from "../../components/form-input/form-input.component";
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
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
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
      console.log("user creatino encountered error", error);
    }
    resetFormFields();
  };

  return (
    <>

      <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
      <form onSubmit={handelSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          name='displayName'
          onChange={handleChanges}
          required
          value={displayName}
          />

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

        <FormInput
          label='Confirm Password'
          type='password'
          onChange={handleChanges}
          name='password'
          value={confirmPassword}
          required
          />

        <Button type='submit'>Sign up</Button>
      </form>
          </div>  
    </>
  );
};

export default SignUpForm;
