import { useState } from "react";
import './sign-in-form.styles.scss';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.componet";
import { createUserDocumnetFromAuth, SignInWithGooglePopup, signInwithUserEmailandPassword } from "../../utils/firebase/firebase.utils";

const SignInForm = () => {

  const defaultFormFields = {
    email: "",
    password: "",
  };

  const [formFields, setFormFieds] = useState(defaultFormFields);

  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFieds({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.length || !password.length) return;

    signInwithUserEmailandPassword(email,password);

  };


  const signInWithGoole = async () => {
    const { user } = await SignInWithGooglePopup();
     await createUserDocumnetFromAuth(user);
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
