import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import { requestAPI } from '../services/deliveryAPI';
import { save, read } from '../services/localStorage';

function CustomersOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    save({
      id: 1,
      name: 'Nome Da Pessoa Usuária',
      email: 'email@dominio.com',
      role: 'customer',
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
      .eyJuYW1lIjoiTm9tZSBEYSBQZXNzb2EgVXN1w6FyaWEiLCJl
      bWFpbCI6ImVtYWlsQGRvbWluaW8uY29tIiwicm9sZSI6ImN1c3RvbWVyIn0
      .s5cmiyY16yViCXkHuzWekxkMeYBi75eT8uJnSbfadNE`,
    });
    const { id } = read();
    const fetchOrders = async () => {
      const getOrders = await requestAPI(`/customers/orders/${id}`);
      setOrders(getOrders);
    };
    fetchOrders();
  }, []);

  return (
    <div className="customers-orders">
      { orders.length > 0
        ? orders.map((order) => (
          <OrderCard
            key={ order.id }
            id={ order.id }
            date={ order.saleDate }
            status={ order.status }
            price={ order.salePrice }
          />)) : 'Você não possui pedidos'}
    </div>
  );
}

export default CustomersOrders;
