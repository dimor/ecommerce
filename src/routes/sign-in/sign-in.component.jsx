import { SignInWithGooglePopup,createUserDocumnetFromAuth } from "../../utils/firebase/firebase.utils";




const SignIn=()=>{

    const logGoogleUser = async () =>{
        const {user} =  await SignInWithGooglePopup();
        const userDocRef = await createUserDocumnetFromAuth(user);
    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with goolge</button>
        </div>
    )
}

export default SignIn;