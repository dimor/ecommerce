import {createContext, useState } from "react";

export const CartDropdownContext = createContext({
    isDropdownOpen:false,
    setDropdown:()=>{}
});



export const CardDropdownProvider =({children})=>{

    const [isDropdownOpen,setDropdown] = useState(false);

    const value ={isDropdownOpen,setDropdown}

    return <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
}