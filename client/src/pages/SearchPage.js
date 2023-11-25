import React from 'react';
import { useSearch } from '../context/search';
import Layout from '../components/layout/layout';
import Loader from '../components/Loader';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';

const SearchPage = () => {
    const [values] = useSearch();
    const [cart, setCart] = useCart();
  return (
    <Layout title='My-Cart : Search'>
        <div className='container'>
            <div className='text-center'>
                <h3>Search Results</h3>
                <h6>{values?.results?.length < 1 ? 'No Products Found' : `Found ${values?.results?.length}`}</h6>
                {values?.results?.length ? <div className='d-flex justify-content-around flex-wrap'>
                { values?.results?.map((product) => (
                    <div className="card mt-3 mb-3" style={{width: '18rem'}}>
                    <img src={`${process.env.REACT_APP_GET_PRODUCT_PHOTO}/${product._id}`} className="card-img-top" alt="..." style={{height:'200px', objectFit:'contain'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description.substring(0,30)}</p>
                        <p className="card-text">Rs. {product.price?.toLocaleString()}</p>
                        <div className='d-flex flex-column'>
                        <button className='btn btn-primary mb-2'>More Details</button>
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
        </div>
    </Layout>
  )
}

export default SearchPage;
