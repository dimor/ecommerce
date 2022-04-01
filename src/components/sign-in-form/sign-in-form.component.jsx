import { useState } from "react";
import './sign-in-form.styles.scss';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componet";
import { SignInWithGooglePopup, signInwithUserEmailandPassword } from "../../utils/firebase/firebase.utils";


const SignInForm = () => {

  
  const defaultFormFields = {
    email: "",
    password: "",
  };
  
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.length || !password.length) return;

    try {
      const { user } = await signInwithUserEmailandPassword(
        email,
        password
      );
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };


  const signInWithGoole = async () => {
    await SignInWithGooglePopup();
  };


  return (
    <div className="sign-in-container">
    <h2>I already gave an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
        label="Email"
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />
        <FormInput
        label="Password"
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />
        <div className="buttons-container">
        <Button type="submit">Sign in</Button>
        <Button type="button" onClick={signInWithGoole} buttonType="google">GOOGLE SIGN IN</Button>
        </div>

      </form>
    </div>
  );
};

export default SignInForm;
