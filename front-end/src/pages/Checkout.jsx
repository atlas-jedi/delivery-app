import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { requestAPI, postAPI, setToken } from '../services/deliveryAPI';
import { read, save, remove } from '../services/localStorage';
import NavBar from '../components/NavBar';
import DeliveryContext from '../contexts/DeliveryContext';
import ProductContext from '../contexts/ProductContext';
import '../styles/CheckoutStyle.css';
import TableCheckout from '../components/TableCheckout';

function Checkout() {
  const { user } = useContext(DeliveryContext);

  const history = useHistory();
  const { cart, setCart } = useContext(ProductContext);
  const [seller, setSeller] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState();

  useEffect(() => {
    const fetchSeller = async () => {
      const response = await requestAPI('/customer/checkout/');
      setSeller(response);
    };
    fetchSeller();
  }, []);

  const { current: setCartRef } = useRef(setCart);

  useEffect(() => {
    const storedItems = read('cart') || [];
    setCartRef(storedItems);
  }, [setCartRef]);

  const removeItem = (id) => {
    const updatedItems = cart.filter((item) => item.id !== id);
    save('cart', updatedItems);
    setCart(updatedItems);
  };

  useEffect(() => {
    function calculateTotal() {
      const sum = cart.reduce((tot, item) => tot + Number(item.price) * item.qty, 0);
      setTotal(sum.toFixed(2));
    }
    calculateTotal();
  }, [cart]);

  async function handleClick(e) {
    e.preventDefault();
    setToken(user.token);
    console.log(user);
    console.log(`token: ${user.token}`);
    const newSale = await postAPI('/customer/checkout', {
      userId: user.id,
      sellerId: seller[0].id,
      totalPrice: Number(total),
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      saleDate: Date.now(),
      products: cart,
    }, user.token);
    history.push(`/customer/orders/${newSale.id}`);
    remove('cart');
  }

  return (
    <div className="checkout-page">
      <NavBar />
      <div className="checkout-details">
        <h3 className="checkout-title">Finalizar Pedido</h3>
        <TableCheckout items={ cart } removeItem={ removeItem } />
        <div>
          <p
            className="checkout-total"
            data-testid="customer_checkout__element-order-total-price"
          >
            {`Total: ${total}`.replace('.', ',')}
          </p>
        </div>
        <br />
        <h3 className="checkout-title">Detalhes e Endereço para Entrega</h3>
        <form onSubmit={ handleClick }>
          <label htmlFor="select-seller">
            { 'P. Vendedor Responsável: ' }
            <select data-testid="customer_checkout__select-seller">
              {
                seller.length > 0 && seller.map((sel) => (
                  <option key="sel.id" value={ sel.id }>
                    {sel.name}
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="input-address" className="checkout-title">
            { 'Endereço: ' }
            <input
              className="input-address"
              value={ address }
              onChange={ (e) => setAddress(e.target.value) }
              name="input-address"
              type="text"
              data-testid="customer_checkout__input-address"
              required
            />
          </label>
          <label htmlFor="input-number" className="checkout-title">
            { 'Número: ' }
            <input
              className="input-checkout"
              value={ addressNumber }
              onChange={ (e) => setAddressNumber(e.target.value) }
              name="input-number"
              type="number"
              data-testid="customer_checkout__input-address-number"
              required
            />
          </label>
          <button
            className="finish-button"
            type="submit"
            data-testid="customer_checkout__button-submit-order"
          >
            Finalizar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
