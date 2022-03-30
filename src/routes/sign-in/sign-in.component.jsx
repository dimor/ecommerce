
import {
  SignInWithGooglePopup,
  createUserDocumnetFromAuth,
  auth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await SignInWithGooglePopup();
    const userDocRef = await createUserDocumnetFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with goolge</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;

//   userEffect(async () => {
//     const resposne = await getRedirectResult(auth);
//     if(resposne){
//         const userDocRef = await createUserDocumnetFromAuth(resposne.user);
//     }
//   }, []);

//   const logGoogleRedirectUser = async () => {
//     const { user } = await signInWithGoogleRedirect();
//   };
