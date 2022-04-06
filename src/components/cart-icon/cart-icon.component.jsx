import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../contexts/cart.context';



const CartIcon  = () =>{

    const {isDropdownOpen,setDropdown,total} = useContext(CartContext);


    const toggle=()=>setDropdown(!isDropdownOpen);

    return(
        <div onClick={toggle} className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{total}</span>
        </div>
    )
}


export default CartIcon;