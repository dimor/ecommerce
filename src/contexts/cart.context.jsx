import { createContext, useReducer  } from "react";

import {createAction} from '../utils/reducer/reducer.utils';

export const CartContext = createContext({
    isDropdownOpen: false,
    setDropdown: () => {},
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    total: 0,
    clearItemFromCart: () => { },
    checkoutTotal: 0
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


export const CART_ACTIONS = {
    SET_CART_DROPDOWN: 'SET_CART_DROPDOWN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_TOTAL: 'SET_TOTAL',
    SET_CHECKOUT_TOTAL: 'SET_CHECKOUT_TOTAL'
}



export const INITIAL_STATE = {
    isDropdownOpen: false,
    cartItems: [],
    total: 0,
    checkoutTotal: 0
}


const cartReducer = (state, action) => {

    const { type, payload } = action;
    switch (type) {
        case CART_ACTIONS.SET_CART_DROPDOWN:
            return { ...state, isDropdownOpen: payload };
        case CART_ACTIONS.SET_CART_ITEMS:
            return { ...state, ...payload }
        default:
            throw new Error("Reducer Action cant be found");
    }
}



export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const { isDropdownOpen, cartItems, total, checkoutTotal } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCheckoutTotal = newCartItems.reduce((total, currentCart) => total + currentCart.quantity * currentCart.price, 0);
        const newCartCount = newCartItems.reduce((total, currentCart) => total + currentCart.quantity, 0);
        dispatch(createAction(CART_ACTIONS.SET_CART_ITEMS,{ cartItems: newCartItems, total: newCartCount, checkoutTotal: newCheckoutTotal }));
    }

    const setDropdown=(isOpen)=>{
        dispatch(createAction(CART_ACTIONS.SET_CART_DROPDOWN,isOpen));
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const value = {
        isDropdownOpen,
        setDropdown,
        addItemToCart,
        cartItems,
        total,
        removeItemFromCart,
        clearItemFromCart,
        checkoutTotal
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
