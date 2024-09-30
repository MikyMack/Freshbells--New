import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../pageProps/Breadcrumbs';
import { OrderList } from '../../actions/CartActions';
import { baseURL } from '../../constants';
import { FaBoxOpen } from 'react-icons/fa';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    OrderList().then((res) => {
      setOrders(res.order);
    });
  }, []);

  return (
    <div className="xl:container p-4 md:p-8 bg-[#EFFDEC] min-h-screen">
      <Breadcrumbs title="Order Details" />
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <FaBoxOpen className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">You don't have any orders</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="font-bold text-lg mb-4">Order #{order.invoice_no}</h2>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="flex flex-col mb-4 md:mb-0">
                <span className="font-semibold">Total Price</span>
                <span className="text-lg">₹{order.total_price}</span>
              </div>
              <div className="flex flex-col mb-4 md:mb-0">
                <span className="font-semibold">Payment Mode</span>
                <span className="text-green-600">{order.payment_mode}</span>
              </div>
              <div className="flex flex-col mb-4 md:mb-0">
                <span className="font-semibold">Payment Status</span>
                <span className="text-green-600">{order.payment_status}</span>
              </div>
              <div className="flex flex-col mb-4 md:mb-0">
                <span className="font-semibold">Order Status</span>
                <span className="text-green-600">{order.order_status}</span>
              </div>
              <div className="flex flex-col mb-4 md:mb-0">
                <span className="font-semibold">Order Date</span>
                <span>{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Order Time</span>
                <span>{order.time}</span>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl shadow-inner p-4 mb-4">
              <h2 className="font-bold text-lg mb-2">Billing Address</h2>
              <p>{order.billing_address.name}</p>
              <p>{order.billing_address.address}</p>
              <p>{order.billing_address.city}, {order.billing_address.state} - {order.billing_address.zip_code}</p>
              <p>Phone: {order.billing_address.phone}</p>
              {order.billing_address.alternate_phone && <p>Alternate Phone: {order.billing_address.alternate_phone}</p>}
            </div>

            <div className="bg-gray-100 rounded-xl shadow-inner p-4 mb-4">
              <h2 className="font-bold text-lg mb-2">Delivery Address</h2>
              <p>{order.delivery_address.name}</p>
              <p>{order.delivery_address.address}</p>
              <p>{order.delivery_address.city}, {order.delivery_address.state} - {order.delivery_address.zip_code}</p>
              <p>Phone: {order.delivery_address.phone}</p>
              {order.delivery_address.alternate_phone && <p>Alternate Phone: {order.delivery_address.alternate_phone}</p>}
            </div>

            <div className="bg-gray-100 rounded-xl shadow-inner p-4 mb-4">
              <h2 className="font-bold text-lg mb-2">Product Details</h2>
              {order.products.map((product) => (
                <div key={product.id} className="flex items-center justify-between mb-2">
                  <img className="w-20 h-20 rounded mr-4" src={`${baseURL}${product.image}`} alt={product.name} />
                  <div className="flex flex-col">
                    <p className="font-bold">{product.name}</p>
                    <p className="text-gray-500">₹{product.total_price}</p>
                    <p className="text-gray-500">Quantity: {product.quantity}</p>
                    <p className="text-gray-500">Volume: {product.order_product_details.volume}{product.order_product_details.unit}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-100 rounded-xl shadow-inner p-4">
              <h2 className="font-bold text-lg mb-2">Order Tracking</h2>
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <div className="flex-1 ml-2">Order Placed</div>
                  <div className="text-gray-600">{new Date(order.date).toLocaleDateString()} {order.time}</div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <div className="flex-1 ml-2">Shipped</div>
                  <div className="text-gray-600">02:48 PM, 03 June, 2024</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <div className="flex-1 ml-2">Delivered</div>
                  <div className="text-gray-600">11:53 AM, 07 June, 2024</div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderDetails;
