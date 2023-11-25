import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const CartBag = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState("");

  const removeCartItem = (pid) => {
    let myCart = [...cart];
    let index  = myCart.findIndex(item => item._id === pid);
    myCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(myCart));
    setCart(myCart);
  }

  const getToken = async () => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_CLIENT_TOKEN);
      setClientToken(data.data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getToken();
  }, [auth?.user]);

  useEffect(() => {
    let existingCartItems = localStorage.getItem('cart');
    if (existingCartItems) setCart(JSON.parse(existingCartItems));
    // eslint-disable-next-line
  }, []);

  const getTotal = () => {
    let total = 0;
    cart?.map((item) => total = total + item.price);

    return total.toLocaleString();
  }

  const handlePayment = async () => {
    try {
      const { nonce } = instance.requestPaymentMethod();
      setLoading(true);
      const { data } = await axios.post(process.env.REACT_APP_PAYMENT, { nonce, cart });
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      toast.success('Order placed successfully!');
      setTimeout(() => navigate('/dashboard/orders'), 2000);
    } catch (err) {
      toast.error('Cannot place orders at this moment.')
      console.log(err);
    }
  };
  return (
    <Layout>
      <ToastContainer />
      {auth?.token ? (
      <div className='container'>
      <div className='row mt-4'>
        <div className='col-md-12'>
          <h3 className='text-center bg-light p-2 mb-1'>
            {`Hello ${auth?.user?.name}`}
          </h3>
          <h5 className='text-center'>
            {cart.length > 1 ? `You have total ${cart.length} items in your cart!` : 'Your cart is empty!'}
          </h5>
        </div>
      </div>
      <div className='row mt-4 mb-4'>
        <div className='col-md-6'>
            {
              cart?.map((product) => (
                <div className='row m-1 card flex-row'>
                  <div className='col-md-4 me-4'>
                    <img src={`${process.env.REACT_APP_GET_PRODUCT_PHOTO}/${product?._id}`} alt={product?.name} style={{width:"150px", height:"160px", objectFit:"contain"}} />
                  </div>
                  <div className='col-md-6 mt-4'>
                    <h5>{product.name}</h5>
                    <h6>{product.description.substring(0,30)}...</h6>
                    <h6>Price: {product.price?.toLocaleString()}</h6>
                    <button className='btn btn-danger mt-4 mb-4' onClick={() => removeCartItem(product._id)}>Remove Item</button>
                  </div>
                </div>
              ))
            }
        </div>
        <div className='col-md-6 text-center'>
          <h4>Cart Summary</h4>
          <p>TOTAL | CHECKOUT | PAYMENT</p>
          <hr />
          <h5>TOTAL: Rs. {getTotal()}</h5>
          {auth?.user?.address ? (
            <>
            <div className='mb-3 mt-5'>
              <h5>Current Address</h5>
              <h6>{auth.user.address}</h6>
              <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/profile')}>Update Address</button>
            </div>
            {
              !clientToken || !cart?.length ? "" : (
                <>
            <DropIn
            options={{
              authorization: clientToken,
            }}
            onInstance={instance => setInstance(instance)}
            />
          <div className='mt-2'>
            <button className='btn btn-primary' onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>Make Payment</button>
          </div>
                </>
              )
            }
            </>
          ) : <div className='mb-3 mt-6'>
               <h6>Please add address to continue shopping</h6>
               <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/profile')}>Add Address</button>
            </div>}
        </div>
      </div>
      </div>
      ) : <div className='d-flex flex-column align-items-center'>
         <span style={{marginTop:'4rem', fontSize:'17px', fontWeight:'600'}}>Please login to continue shopping..</span>
         <div style={{fontSize:'4rem', fontWeight:'600'}}>🛒</div>
         <button className='btn btn-secondary mt-4 mb-4' onClick={() => navigate('/login', { state: '/cart' })} style={{maxWidth:'8rem'}}>Login</button>
        </div>}
    </Layout>
  )
}

export default CartBag;
