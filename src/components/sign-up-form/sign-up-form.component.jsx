import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumnetFromAuth } from "../../utils/firebase/firebase.utils";

const SignUpForm = () => {

    const defaultFormFields = {
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      };

      const [formFields, setFormFieds] = useState(defaultFormFields);

      const { displayName, email, password, confirmPassword } = formFields;
    
      const handleChange =(event)=>{
        const {name,value} = event.target;
        setFormFieds({...formFields, [name]:value})
      }


      const handleSubmit= async (event)=>{

        event.preventDefault();

        if(password!==confirmPassword) return;

        const {user} = await createAuthUserWithEmailAndPassword(email,password);

        const userDocRef = await createUserDocumnetFromAuth(user);

        console.log(user);

      }

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input type={"text"} required name="displayName" onChange={handleChange} value={displayName}/>

        <label>Email</label>
        <input type={"email"} required name="email" onChange={handleChange} value={email}/>

        <label>Password</label>
        <input type={"password"} required name="password" onChange={handleChange} value={password}/>

        <label>Confirm Password</label>
        <input type={"password"}  required name="confirmPassword" onChange={handleChange} value={confirmPassword}/>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
