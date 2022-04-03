import {createContext, useState } from "react";

const addCartItem =(cartItems,productToAdd)=>{

}


export const CartDropdownContext = createContext({
    isDropdownOpen:false,
    setDropdown:()=>{},
    cartItems:[],
    addItemToCart:()=>{}
});



export const CardDropdownProvider =({children})=>{

    const [isDropdownOpen,setDropdown] = useState(false);

    const value ={isDropdownOpen,setDropdown}

    const [cartItems,setCartItems] = useState([]);

    const addItemToCart =(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd))
    }

    return <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
}