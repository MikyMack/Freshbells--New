import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { ADD_Billing_Address, Get_Address, CREATE_ORDER, PlaceOrder } from "../../actions/CartActions";
import Breadcrumbs from "../pageProps/Breadcrumbs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick";
import OrderPlaced from "../designLayouts/OrderPlaced";

const RAZORPAY_KEY_ID = "rzp_test_lXUi7ttbsFr49f";

const CheckoutForm = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const email = userDetails ? userDetails.email : '';
  const [billing, setBilling] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [carts, setCarts] = useState([]);
  const [selectedBillingIndex, setSelectedBillingIndex] = useState(null);
  const [selectedShippingIndex, setSelectedShippingIndex] = useState(null);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [newBilling, setNewBilling] = useState({});
  const [newShipping, setNewShipping] = useState({});
  const [amountCal, setAmountCal] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await Get_Address();
        setBilling(response.billingAddress);
        setShipping(response.delivery_addresses);
        setAmountCal(response);
        setCarts(response.carts);
      } catch (error) {
        toast.error("Error fetching addresses");
      }
    };

    fetchAddresses();
  }, []);

  const handleNewBillingChange = (e) => {
    const { name, value } = e.target;
    setNewBilling({ ...newBilling, [name]: value });
  };

  const handleNewShippingChange = (e) => {
    const { name, value } = e.target;
    setNewShipping({ ...newShipping, [name]: value });
  };

  const handleBillingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ADD_Billing_Address(newBilling);
      if(response.status===true){
        setBilling([...billing, newBilling]);
        setShowBillingForm(false);
        setNewBilling({});
      }
    } catch (error) {
      toast.error("Error submitting billing information")
    }
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ADD_Billing_Address(newShipping);
      if(response.status===true){
        setShipping([...shipping, newShipping]);
        setShowShippingForm(false);
        setNewShipping({});
      }
    } catch (error) {
      toast.error("Error submitting shipping information")
    }
  };

  const handleOrderSubmit = async () => {
    const totalAmount = amountCal.total_price + amountCal.shipping_amount;
    try {
      const orderResponse = await CREATE_ORDER(totalAmount);

      if (orderResponse && orderResponse.id && orderResponse.amount && orderResponse.currency) {
        const { id: order_id, amount: order_amount, currency } = orderResponse;

        const selectedBilling = billing[selectedBillingIndex];
        const selectedShipping = sameAsBilling ? selectedBilling : shipping[selectedShippingIndex];

        const options = {
          key: RAZORPAY_KEY_ID,
          amount: order_amount,
          currency: currency,
          name: "FRESH BELLS",
          description: "Test Transaction",
          order_id: order_id,
          handler: async function (response) {
            console.log(response,"response");
            const paymentData = {
              rzp_order_id: response.razorpay_order_id,
              rzp_payment_id: response.razorpay_payment_id,
              rzp_signature: response.razorpay_signature,
              total_price: totalAmount,
              delivery_address_id: selectedShipping.id,
              name:selectedShipping.name,
              email
            };

            const placeOrderResponse = await PlaceOrder(paymentData);
            if (placeOrderResponse.status === true) {
              toast.success("Payment and order placed success");
              setOrderPlaced(true);
            } else {
              toast.error("Payment and order placement failed");
            }
          },
          prefill: {
            name: selectedBilling.name,
            email: "freshbells@gmail.com",
            contact:  selectedBilling.phone,
          },
          notes: {
            address: selectedBilling.address,
          },
          theme: {
            color: "#324c21",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error("Invalid order response");
      }
    } catch (error) {
      console.error("Error creating order", error);
      toast.error("Failed to initiate payment");
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (orderPlaced) {
    return <OrderPlaced />;
  }

  return (
    <div className="xl:container px-4 mx-auto p-4 font-body3">
      <ToastContainer />
      <Breadcrumbs title="Checkout" />
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* Forms Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Billing Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
            {billing.length > 0 ? (
              <Slider {...sliderSettings}>
                {billing.map((billingInfo, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${selectedBillingIndex === index ? 'bg-gray-200' : ''}`} onClick={() => setSelectedBillingIndex(index)}>
                    <p className="font-medium">Name: {billingInfo.name}</p>
                    <p>Address: {billingInfo.address}</p>
                    <p>Phone: {billingInfo.phone}</p>
                    <p>AlternatePhone: {billingInfo.alternate_phone}</p>
                    <p>City: {billingInfo.city}</p>
                    <p>State: {billingInfo.state}</p>
                    <p>Pincode: {billingInfo.zip_code}</p>
                    <p>Landmark: {billingInfo.landmark}</p>
                  </div>
                ))}
              </Slider>
            ) : (
              <p>No billing addresses available.</p>
            )}
            {showBillingForm ? (
              <form onSubmit={handleBillingSubmit} className="mt-4 space-y-4">
                <div>
                  <label>Name</label>
                  <input type="text" name="billing_name" onChange={handleNewBillingChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label>Address</label>
                  <input type="text" name="billing_address" onChange={handleNewBillingChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label>City</label>
                  <input type="text" name="billing_city" onChange={handleNewBillingChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label>State</label>
                  <input type="text" name="billing_state" onChange={handleNewBillingChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label>Phone</label>
                  <input type="text" name="billing_phone" onChange={handleNewBillingChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label>Alternative Phone</label>
                  <input type="text" name="billing_alt_phone" onChange={handleNewBillingChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label>Pincode</label>
                  <input type="text" name="billing_zip_code" onChange={handleNewBillingChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label>Landmark</label>
                  <input type="text" name="billing_landmark" onChange={handleNewBillingChange} className="w-full border p-2 rounded" />
                </div>
                <button type="submit" className="bg-green-500 text-white p-2 rounded mr-2">Submit Billing Address</button>
                <button type="button" onClick={() => setShowBillingForm(false)} className="bg-red-500 text-white p-2 rounded">Cancel</button>
              </form>
            ) : (
              <button onClick={() => setShowBillingForm(true)} className="mt-4 bg-green-500 hover:bg-primeColor text-white p-2 rounded">Add New Billing Address</button>
            )}
          </div>

          {/* Shipping Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <div className="mb-4">
              <input type="checkbox" id="sameAsBilling" checked={sameAsBilling} onChange={() => setSameAsBilling(!sameAsBilling)} />
              <label htmlFor="sameAsBilling" className="ml-2">Same as Billing Information</label>
            </div>
            {!sameAsBilling && (
              <>
                {shipping.length > 0 ? (
                  <Slider {...sliderSettings}>
                    {shipping.map((shippingInfo, index) => (
                      <div key={index} className={`p-4 border rounded-lg ${selectedShippingIndex === index ? 'bg-gray-200' : ''}`} onClick={() => setSelectedShippingIndex(index)}>
                        <p className="font-medium">Name: {shippingInfo.name}</p>
                        <p>Address: {shippingInfo.address}</p>
                        <p>Phone: {shippingInfo.phone}</p>
                        <p>AlternatePhone: {shippingInfo.alternate_phone}</p>
                        <p>City: {shippingInfo.city}</p>
                        <p>State: {shippingInfo.state}</p>
                        <p>Pincode: {shippingInfo.zip_code}</p>
                        <p>Landmark: {shippingInfo.landmark}</p>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <p>No shipping addresses available.</p>
                )}
                {showShippingForm ? (
                  <form onSubmit={handleShippingSubmit} className="mt-4 space-y-4">
                    <div>
                      <label>Name</label>
                      <input type="text" name="shipping_name" onChange={handleNewShippingChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                      <label>Address</label>
                      <input type="text" name="shipping_address" onChange={handleNewShippingChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                      <label>City</label>
                      <input type="text" name="shipping_city" onChange={handleNewShippingChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                      <label>State</label>
                      <input type="text" name="shipping_state" onChange={handleNewShippingChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                      <label>Phone</label>
                      <input type="text" name="shipping_phone" onChange={handleNewShippingChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                      <label>Alternative Phone</label>
                      <input type="text" name="shipping_alt_phone" onChange={handleNewShippingChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                      <label>Pincode</label>
                      <input type="text" name="shipping_zip_code" onChange={handleNewShippingChange} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                      <label>Landmark</label>
                      <input type="text" name="shipping_landmark" onChange={handleNewShippingChange} className="w-full border p-2 rounded" />
                    </div>
                    <button type="submit" className="bg-green-500 text-white p-2 rounded mr-2">Submit Shipping Address</button>
                    <button type="button" onClick={() => setShowShippingForm(false)} className="bg-red-500 text-white p-2 rounded">Cancel</button>
                  </form>
                ) : (
                  <button onClick={() => setShowShippingForm(true)} className="mt-4 bg-green-500 hover:bg-primeColor text-white p-2 rounded">Add New Shipping Address</button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 h-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {carts.map((cartItem, index) => (
              <div key={index} className="flex justify-between items-center">
                <p>{cartItem.name}</p>
                <p className="flex items-center">{cartItem.quantity} x <FaRupeeSign className="text-base" />{cartItem.price}</p>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <p className="flex items-center"><FaRupeeSign className="text-sm" />{amountCal.total_price}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Shipping</p>
            <p className="flex items-center"><FaRupeeSign className="text-sm" />{amountCal.shipping_amount}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center font-bold">
            <p>Total</p>
            <p className="flex items-center"><FaRupeeSign className="text-sm"/>{amountCal.total_price + amountCal.shipping_amount}</p>
          </div>
          <button onClick={handleOrderSubmit} className="mt-4 bg-green-500 hover:bg-primeColor text-white p-2 rounded w-full">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
