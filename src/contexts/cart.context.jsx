import { createContext, useEffect, useState } from "react";


export const CartContext = createContext({
    isDropdownOpen: false,
    setDropdown: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    total: 0,
    clearItemFromCart:()=>{},
    checkoutTotal:0
});



const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

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


const removeCartItem = (cartItems, cartItemToRemove) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );

}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);





    export const CartProvider = ({ children }) => {

        const [isDropdownOpen, setDropdown] = useState(false);
        const [cartItems, setCartItems] = useState([]);
        const [total, setTotal] = useState(0);
        const [checkoutTotal, setCheckoutTotal] = useState(0);


        const addItemToCart = (productToAdd) => {
            setCartItems(addCartItem(cartItems, productToAdd));
        }


        const removeItemFromCart = (cartItemToRemove) => {
            setCartItems(removeCartItem(cartItems, cartItemToRemove));
        }

        const clearItemFromCart = (cartItemToClear) => {
            setCartItems(clearCartItem(cartItems, cartItemToClear));
        }



        useEffect(() => {
            const newCheckoutTotal = cartItems.reduce((total, currentCart) => total + currentCart.quantity * currentCart.price,0);
            setCheckoutTotal(newCheckoutTotal);
        }, [cartItems])

        
        useEffect(() => {
            const cartCount = cartItems.reduce((total, currentCart) => total + currentCart.quantity, 0);
            setTotal(cartCount);
        }, [cartItems])

        const value = { isDropdownOpen, setDropdown, addItemToCart, cartItems, total,removeItemFromCart,clearItemFromCart,checkoutTotal }

        return <CartContext.Provider value={value}>{children}</CartContext.Provider>
    }
