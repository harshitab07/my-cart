import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import UserMenu from '../../components/layout/UserMenu';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(process.env.REACT_APP_ORDERS);
      setOrders(data)
      setLoading(false);
    } catch(error) {
      setLoading(false);
      console.log(error);
      toast.error('Failed to retrieve orders');
    }
  };

  let allProducts = orders?.flatMap(order => order.products) || [];
console.log(allProducts)
  useEffect(() => {
    if(auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title='My-Cart : Orders'>
      <ToastContainer />
    {loading ? <Loader /> : <div className='container-fluid m-3 p-3'>
    <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <h3>All Orders</h3>
            <div className='card p-4'>
{ allProducts?.length ? <table class="table m-4">
  <thead>
    <tr>
      <th scope="col">Sr. No.</th>
      <th scope="col">Product Name</th>
      <th scope="col">Order date</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    {allProducts?.map((order, index) => (
      <>
      <tr>
      <th scope='row'>{index+1}</th>
      <td>{order.name}</td>
      <td>{order.createdAt?.substring(0,10)}</td>
      <td>Rs. {order.price}</td>
      </tr>
      </>
    ))}
  </tbody>
</table> : <div>
<h4>You have not placed any orders yet!</h4>
<button className='btn btn-outline-secondary' onClick={() => navigate('/')}>Place Order</button>
</div>}
</div>
          </div>
        </div>
    </div>}
    </Layout>
  )
}

export default Orders;
