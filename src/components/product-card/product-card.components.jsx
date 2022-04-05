import './product-card.styles.scss';
import Button from "../button/button.componet";
import { CartDropdownContext } from '../../contexts/cart-dropdown.context';
import { useContext } from 'react';




const ProductCard = ({ product }) => {

    const { name, price, imageUrl } = product;

    const {addItemToCart} = useContext(CartDropdownContext);

    const addProductToCart = () =>addItemToCart(product);



    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button onClick={addProductToCart} buttonType="inverted">Add to card</Button>
        </div>)

}


export default ProductCard;