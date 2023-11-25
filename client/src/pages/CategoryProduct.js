import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/layout'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { useCart } from '../context/cart';

const CategoryProduct = () => {
    const [ products, setProducts ] = useState([]);
    const [cart, setCart] = useCart();
    const params = useParams();
    const navigate = useNavigate();
    const id = params?.id;
    const getProducts = async () => {
        try {
            const { data } = await axios(`${process.env.REACT_APP_CATEGORY_WISE_PRODUCTS}/${id}`);
            setProducts(data.data);
        } catch (error) {
            console.log("error in get products", { error });
            toast.error('Unable to display products at the moment!');
        }
    }

    useEffect(() => {
        if (params?.id) getProducts();
        // eslint-disable-next-line
    }, [params?.id]);

    const handleMoreDetails = async (id) => {
        navigate(`/product/${id}`);
      };

  return (
    <Layout title='My-Cart : Products'>
        <div className='container fluid mt-4 md-4'>
        <h3 className='text-center'>All Products</h3>
            {products.length ? <div className='d-flex justify-content-around flex-wrap'>
                { products?.map((product) => (
                    <div className="card mt-3 mb-3" style={{width: '18rem'}}>
                    <img src={`${process.env.REACT_APP_GET_PRODUCT_PHOTO}/${product._id}`} className="card-img-top" alt="..." style={{height:'200px', objectFit:'contain'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description.substring(0,30)}</p>
                        <p className="card-text">Rs. {(product.price)?.toLocaleString()}</p>
                        <div className='d-flex flex-column'>
                        <button className='btn btn-primary mb-2' onClick={() => handleMoreDetails(product._id)}>More Details</button>
                        <button className='btn btn-secondary' onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem('cart', JSON.stringify([...cart, product]));
                            toast.success('Item added to cart');
                        }}>Add to Cart</button>
                        </div>
                    </div>
                    </div>
                )) }
                </div> : <Loader />}
        </div>
    </Layout>
  )
}

export default CategoryProduct
