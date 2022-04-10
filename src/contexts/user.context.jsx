import { createContext, useState, useEffect, useReducer } from "react";
import { createUserDocumnetFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTIONS = {
  SET_CURRENT_USER : 'SET_CURRENT_USER'
}

const userReducer=(state,action)=>{

    switch(action.type){
      case USER_ACTIONS.SET_CURRENT_USER:
        return{
          ...state, currentUser : action.payload
        }
      default:
         throw new Error("Reducer Action cant be found");
    }
}

export const INITIATE_STATE ={
  currentUser : null
}


// is an actual component
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  
  const [{currentUser},dispatch] = useReducer(userReducer,INITIATE_STATE);
  
  const setCurrentUser = (user)=>{
    dispatch(createAction(USER_ACTIONS.SET_CURRENT_USER,user));
  }

  const value = { currentUser, setCurrentUser };
  
  useEffect(() => {
    const unSubscribe = onAuthStateChangedListener((user) => {
      if(user){
         createUserDocumnetFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unSubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
