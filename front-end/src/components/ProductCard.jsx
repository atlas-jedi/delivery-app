import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ProductContext from '../contexts/ProductContext';
import '../styles/ProductsStyle.css';
// import { read, save } from '../services/localStorage';

function ProductCard({ product }) {
  const TWENTY_ONE = 21;
  // console.log(product.id);
  const { addToCart, removeFromCart } = useContext(ProductContext);
  const { id, name, price, urlImage } = product;
  const [cartQty, setCartQty] = useState(0);

  // useEffect(() => {
  //   const storeCart = read('cart');
  //   setCart(storeCart);
  // }, []);
  // useEffect(() => {
  //   const storeCart = read('cart');
  //   setCart(storeCart);
  //   if (Array.isArray(cart) && cart.length > 0) {
  //     const [iQty] = cart.filter((cartItem) => +cartItem.id === +id);
  //     if (iQty) {
  //       setCartQty(iQty.qty);
  //     } else {
  //       setCartQty(0);
  //     }
  //   } else {
  //     setCartQty(0);
  //   }
  // }, []);

  // const updateCart = (value) => {
  //   const storeCart = read('cart') || [];
  //   const isProduct = storeCart.some((item) => +item.id === +id);
  //   if (!isProduct) {
  //     storeCart.push({ ...product, qty: 1 });
  //     setCart([...storeCart]);
  //     save('cart', storeCart);
  //   } else {
  //     const updatedCart = storeCart.map((cartItem) => {
  //       if (+cartItem.id === +id) {
  //         cartItem.qty = +value;
  //       }
  //       return cartItem;
  //     });
  //     setCart([...updatedCart]);
  //     save('cart', updatedCart);
  //   }
  // };

  const addQty = () => {
    const newQty = cartQty + 1;
    setCartQty(newQty);
    addToCart(product, 1);
  };
  const removeQty = () => {
    if (cartQty > 0) {
      const newQty = cartQty - 1;
      setCartQty(newQty);
    }
    removeFromCart(product);
  };

  const handleChange = ({ target }) => {
    setCartQty(0);
    const { value } = target;
    // console.log(value);
    if (value.length > 0) {
      setCartQty(Number(value));
      addToCart(product, Number(value));
    }
    // ;
    // updateCart(value);
  };

  return (
    <div className="product-card">

      <div className="product-price">
        <span>R$</span>
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {price.replace('.', ',')}
        </span>
      </div>
      {/* <button */}
      {/* type="button"
        > */}
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ urlImage.slice(TWENTY_ONE) }
        // width={ 75 }
      />
      <div className="info-container">
        <div
          data-testid={ `customer_products__element-card-title-${id}` }
          className="product-name"
        >
          {name}
        </div>
        {/* </button> */}

        <div className="qty-container">
          <button
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            type="button"
            onClick={ () => removeQty() }
            name="subtract"
            className="sub-button"
          >
            -
          </button>

          <input
            className="product-input"
            type="number"
            min={ 0 }
            data-testid={ `customer_products__input-card-quantity-${id}` }
            onChange={ (e) => handleChange(e) }
            value={ cartQty }
          />
          <button
            data-testid={ `customer_products__button-card-add-item-${id}` }
            type="button"
            onClick={ () => addQty() }
            name="add"
            className="add-button"
          >
            +
          </button>
        </div>
      </div>
    </div>

  );
}
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,

};
export default ProductCard;
