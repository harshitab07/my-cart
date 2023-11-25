import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Layout from '../../components/layout/layout';
import AdminMenu from '../../components/layout/AdminMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateProductForm from '../../containers/CreateProductForm';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [ categories, setCategories ] = useState([]);
  const [ photo, setPhoto ] = useState('');
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ quantity, setQuantity ] = useState('');
  const [ shipping, setShipping ] = useState('');

  const data = { categories, setCategories, photo, setPhoto, name, setName, description, setDescription, price, setPrice, category, setCategory, quantity, setQuantity, shipping, setShipping  };

    // get all categories
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

    useEffect(() => {
      getAllCategories();
    }, []);

    const handleCreateProduct = async () => {
      try {
        const productData = new FormData();
        productData.append('name', name);
        productData.append('description', description);
        productData.append('price', price);
        productData.append('quantity', quantity);
        productData.append('photo', photo);
        productData.append('category', category);
        productData.append('shipping', shipping);

        const { data } = await axios.post(process.env.REACT_APP_CREATE_PRODUCT, productData);
        if (data?.success) {
          toast.success('Product created successfully');
          setTimeout(() => navigate('/admin-dashboard/products'), 2000 );
        } else {
          toast.error(data?.message || 'Failed to create product!');
        }
      } catch (error) {
        console.log('Error in create product', { error });
        toast.error('Failed to create product');
      }
    }

  return (
    <Layout title='My-Cart : Users List'>
      <ToastContainer />
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
            <CreateProductForm {...data} handleCreateProduct={handleCreateProduct} type='create' />
        </div>
    </div>
    </Layout>
  )
}

export default CreateProduct;
