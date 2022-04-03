import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';



const CartIcon  = () =>{

    const {isDropdownOpen,setDropdown} = useContext(CartDropdownContext);

    const toggle=()=>setDropdown(!isDropdownOpen);


    return(
        <div onClick={toggle} className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>10</span>
        </div>
    )
}


export default CartIcon;