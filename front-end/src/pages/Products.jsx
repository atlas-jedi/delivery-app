import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import NavBar from '../components/NavBar';
import ProductContext from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import '../styles/ProductsStyle.css';

function Products() {
  const { products, cart, getProducts } = useContext(ProductContext);
  const [totalCost, setTotalCost] = useState(0);
  const history = useHistory();
  const MAX_PAGE_ITEMS = 12;

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    // const storeCart = read('cart') || [];
    // setCart(storeCart);
    const total = cart.reduce((acc, curr) => {
      acc += curr.qty * curr.price;
      return acc;
    }, 0.00);
    setTotalCost(total.toFixed(2));
  }, [cart]);

  const isTotalCost = () => {
    const is = totalCost > 0;
    return is;
  };
  return (
    <>
      <NavBar />
      <div className="products-container">
        {products.map((product, index) => index < MAX_PAGE_ITEMS && (
          <div key={ index }>
            <ProductCard product={ product } />
          </div>
        )) }
      </div>

      <button
        type="button"
        className="cart-button"
        data-testid="customer_products__button-cart"
        disabled={ !isTotalCost() }
        onClick={ () => history.push('/customer/checkout') }
      >
        <span> Ver Carrinho:</span>
        <span>R$</span>

        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {(`${totalCost}`).replace('.', ',')}

        </span>
      </button>

    </>
  );
}

export default Products;
