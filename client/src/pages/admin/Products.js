import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import AdminMenu from '../../components/layout/AdminMenu';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';

const Products = () => {
    const [ products, setProducts ] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_GET_ALL_PRODUCTS);
            if (data?.success) {
                setProducts(data.data.products);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log('Failed to retrieve all products', { error });
            toast.error('Cannot retrieve products at this moment!');
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

  return (
    <Layout title='My-Cart : Products'>
        <ToastContainer />
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              {/* <div className='card w-95 p-3'> */}
                <h3 className='text-center'>Products List</h3>
                <div className='d-flex justify-content-around flex-wrap'>
                { products?.map((product) => (
                    <Link to={`/admin-dashboard/product/${product._id}`} className='product-link'>
                    <div className="card mt-3 mb-3" style={{width: '18rem'}}>
                    <img src={`${process.env.REACT_APP_GET_PRODUCT_PHOTO}/${product._id}`} className="card-img-top" alt="..." style={{height:'200px', objectFit:'contain'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description?.substring(0,30)}</p>
                    </div>
                    </div>
                    </Link>
                )) }
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>
    </Layout>
  )
}
export default Products;
