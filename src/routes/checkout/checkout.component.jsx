import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../contexts/cart.context';
import './checkout.styles.scss';




const Checkout = () => {

    const { cartItems, addItemToCart, removeItemFromCart ,checkoutTotal} = useContext(CartContext);

    return (
        <div className="checkout-container">
            <div className='checkout-header'>
                <div className='header-block'><span>Product</span></div>
                <div className='header-block'><span>Description</span></div>
                <div className='header-block'><span>Quantitiy</span></div>
                <div className='header-block'><span>Price</span></div>
                <div className='header-block'><span>Remove</span></div>
            </div>
            {cartItems.map((cartItem) => {
                return (<CheckoutItem key={cartItem.id} cartItem={cartItem} />)
            })}

            <span className='total'>{`Total $${checkoutTotal}`}</span>
        </div>

    );
}

export default Checkout;