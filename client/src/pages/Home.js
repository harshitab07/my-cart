import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import Layout from '../components/layout/layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const getTotalProducts = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_GET_PRODUCTS_COUNT
      );
      if (data?.success) {
        setTotal(data.data);
      }
    } catch (error) {
      console.log("Error in getting total products count", { error });
      toast.error("Something went wrong!");
    }
  }

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_GET_ALL_CATEGORIES
      );

      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log("Error in getting categories", { error });
      toast.error("Something went wrong in getting category!");
    }
  };

  const getAllProducts = async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_GET_PRODUCTS_PER_PAGE}/${page}`);
        if (data?.success) {
            setProducts(data.data);
        } else {
            toast.error(data?.message);
        }
    } catch (error) {
        console.log('Failed to retrieve all products', { error });
        toast.error('Cannot retrieve products at this moment!');
    }
}

const loadMore = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`${process.env.REACT_APP_GET_PRODUCTS_PER_PAGE}/${page}`);
    if (data?.success) {
        setProducts([...products, ...data.data]);
    } else {
        toast.error(data?.message);
    }
    setLoading(false);
} catch (error) {
    setLoading(false);
    console.log('Failed to load more products', { error });
    toast.error('Cannot retrieve products at this moment!');
}
}

useEffect(() => {
  getAllCategories();
  getTotalProducts();
}, []);

useEffect(() => {
  if (!checked.length && !radio.length) {
    setLoading(true);
    getAllProducts();
    setLoading(false);
  }
// eslint-disable-next-line
}, [checked.length, radio.length]);

useEffect(() => {
  if (checked.length || radio.length) {
    filterProducts();
  }
// eslint-disable-next-line
}, [checked, radio]);

useEffect(() => {
  if (page === 1) return;
    loadMore();
// eslint-disable-next-line
}, [page]);

const handleFilterCategory = (value, id) => {
  let all = [...checked];
  if (value) {
    all.push(id);
  } else {
    all = all.filter(c => c !== id)
  }

  setChecked(all);
};

// get filtered products
const filterProducts = async () => {
  try {
    const { data } = await axios.post(process.env.REACT_APP_FILTER_PRODUCTS, { checked, radio });
    setProducts(data.data);
  } catch (error) {
    console.log('Error in filtering products', { error });
    toast.error('Cannot filter products at this moment!');
  }
}

const handleMoreDetails = (id) => {
  navigate(`/product/${id}`);
};

const handleAddToCart = async (product) => {
  setCart([...cart, product]);
  localStorage.setItem('cart', JSON.stringify([...cart, product]));
  toast.success('Item added to cart');
}

  return (
    <Layout title='Home : My-Cart' description='My-Cart : Online shopping'>
      <div className="container-fluid m-3 p-3">
        <div className='row'>
          <div className='col-md-2 mt-3'>
          <h6 className='text-center'>Filter by Category</h6>
          <div className='d-flex flex-column'>
          {
            categories?.map((category) => <Checkbox key={category._id} onChange={(e) => handleFilterCategory(e.target.checked, category._id)}>{category.name}</Checkbox>)
          }
          </div>
          <h6 className='text-center mt-4'>Filter by Price</h6>
          <div className='d-flex flex-column'>
          <Radio.Group onChange={e => setRadio(e.target.value)}>
            {Prices.map((p) => (
              <div key={p.id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
          </div>
          <div className='d-flex flex-column mt-4'>
          <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTERS</button>
          </div>
          </div>
          <div className='col-md-9'>
            <h3 className='text-center'>All Products</h3>
            {products.length ? <div className='d-flex justify-content-around flex-wrap'>
                { products?.map((product) => (
                    <div className="card mt-3 mb-3" style={{width: '18rem'}}>
                    <img src={`${process.env.REACT_APP_GET_PRODUCT_PHOTO}/${product._id}`} className="card-img-top" alt="..." style={{height:'200px', objectFit:'contain'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description.substring(0,30)}</p>
                        <p className="card-text">Rs. {product.price?.toLocaleString()}</p>
                        <div className='d-flex flex-column'>
                        <button className='btn btn-primary mb-2' onClick={() => handleMoreDetails(product._id)}>More Details</button>
                        <button className='btn btn-secondary' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    </div>
                    </div>
                )) }
                </div> : <Loader />}
            {
              products && (products?.length < total) && (
                <div className='m-2 p-4'>
                  <button className='btn btn-warning' onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}>
                  {loading ? "Loading.." : "Load More"}
                  </button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
