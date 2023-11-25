import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/layout/layout'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { useCart } from '../context/cart';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = params?.id;
  const [cart, setCart] = useCart();

  const getProduct = async() => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_GET_PRODUCT}/${id}`);
      setProduct(data.data);
      getSimilarProducts(id, data.data?.category?._id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in get product", { error });
      toast.error('Unable to get product details at the moment');
    }
  };

  const getSimilarProducts = async(pid, cid) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_RELATED_PRODUCTS}/${pid}/${cid}`);
      setRelatedProducts(data.data);
    } catch (error) {
      console.log("Error in get related product", { error });
      toast.error('Unable to get related products at the moment');
    }
  };
  useEffect(() => {
    if(id) getProduct();
  // eslint-disable-next-line
  }, [id]);

  const productDetailsRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const step = urlParams.get('step');
      if (step === 'product-details' && productDetailsRef.current) {
        productDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  }, []);

  return (
    <Layout>
        <ToastContainer />
        {
          loading ? <Loader /> : (
            <>
            <div className='row'>
              <div className='col-md-6 text-center mt-4'>
              <img src={`${process.env.REACT_APP_GET_PRODUCT_PHOTO}/${id}`} alt={product.name} height={'300px'} />
              </div>
              <div className='col-md-6 mt-4'>
              <h4 className='text-center' ref={productDetailsRef}>Product Details</h4>
              <div>
              <h6 >Name: </h6>{product.name}
              <h6 >Price: </h6>{product.price?.toLocaleString()}
              <h6 >Description: </h6>{product.description}
              <h6 >Category: </h6>{product.category?.name}
              <h6 >Quantity: </h6>{product.quantity}
              <h6 >Shipping: </h6>{product.shipping}
              </div>
              <button className='btn btn-secondary mt-2 mb-2' onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem('cart', JSON.stringify([...cart, product]));
                toast.success('Item added to cart');
              }}>Add to Cart</button>
              </div>
            </div>
            <br />
            <br />
            <div className='row'>
              <h3 className='text-center'>Similar Products</h3>
              <div className='d-flex justify-content-around flex-wrap'>
                { relatedProducts?.length ? relatedProducts?.map((product) => (
                    <div className="card mt-3 mb-3" style={{width: '18rem'}}>
                    <img src={`${process.env.REACT_APP_GET_PRODUCT_PHOTO}/${product._id}`} className="card-img-top" alt="..." style={{height:'200px', objectFit:'contain'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description.substring(0,30)}</p>
                        <p className="card-text">Rs. {product.price?.toLocaleString()}</p>
                        <div className='d-flex flex-column'>
                        <button className='btn btn-primary mb-2' onClick={() => navigate(`/product/${product._id}?step=product-details`)}>More Details</button>
                        <button className='btn btn-secondary' onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem('cart', JSON.stringify([...cart, product]));
                          toast.success('Item added to cart');
                        }}>Add to Cart</button>
                        </div>
                    </div>
                    </div>
                )) : <p className='text-center'>No Similar Products Found</p> }
                </div>
            </div>
            <br />
            </>
          )
        }
    </Layout>
  )
}

export default ProductDetails
