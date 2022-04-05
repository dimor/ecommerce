import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem)=>cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
          cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

    console.log(cartItems);
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}


export const CartDropdownContext = createContext({
    isDropdownOpen: false,
    setDropdown: () => {},
    cartItems: [],
    addItemToCart: () => {},
    total:0
});



export const CardDropdownProvider = ({ children }) => {

    const [isDropdownOpen, setDropdown] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
        updateTotalItems();
    }

    useEffect(()=>{
        const cartCount = cartItems.reduce((total,currentCart)=> total + currentCart.quantity,0);
        setTotal(cartCount);
    },[cartItems])
    
    const value = { isDropdownOpen, setDropdown , addItemToCart , cartItems,total}
    
    return <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
}
    