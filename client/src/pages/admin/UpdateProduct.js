import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Layout from '../../components/layout/layout';
import AdminMenu from '../../components/layout/AdminMenu';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CreateProductForm from '../../containers/CreateProductForm';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [ categories, setCategories ] = useState([]);
  const [ product, setProduct ] = useState({});

  const [ photo, setPhoto ] = useState('');
  const [ name, setName ] = useState('***');
  const [ description, setDescription ] = useState('***');
  const [ price, setPrice ] = useState('***');
  const [ category, setCategory ] = useState('***');
  const [ quantity, setQuantity ] = useState('***');
  const [ shipping, setShipping ] = useState('***');
  const [ id, setId ] = useState("");
  const [ categoryName, setCategoryName ] = useState('');

  const data = { categories, setCategories, photo, setPhoto, name, setName, description, setDescription, price, setPrice, category, setCategory, quantity, setQuantity, shipping, setShipping, id, categoryName  };

      // get single product
      const getProduct = async () => {
        try {
            const id = params?.id
          const { data } = await axios.get(`${process.env.REACT_APP_GET_PRODUCT}/${id}`);
    
          if (data?.success) {
            setProduct(data.data);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log("Error in getting product", { error });
          toast.error("Something went wrong in getting product!");
        }
      };

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
        getProduct();
        setName(product?.name);
        setDescription(product?.description);
        setPrice(product?.price);
        setCategory(product?.category?._id);
        setCategoryName(product?.category?.name);
        setQuantity(product?.quantity);
        setShipping(product?.shipping);
        setId(product?._id);
      }, [product?.name]);
    

    const handleUpdateProduct = async () => {
      try {
        const productData = new FormData();
        productData.append('name', name);
        productData.append('description', description);
        productData.append('price', price);
        productData.append('quantity', quantity);
        photo && productData.append('photo', photo);
        productData.append('category', category);
        productData.append('shipping', shipping);

        const { data } = await axios.put(`${process.env.REACT_APP_UPDATE_PRODUCT}/${id}`, productData);
        if (data?.success) {
          toast.success('Product updated successfully');
          setTimeout(() => navigate('/admin-dashboard/products'), 2000 );
        } else {
          toast.error(data?.message || 'Failed to update product!');
        }
      } catch (error) {
        console.log('Error in update product', { error });
        toast.error('Failed to update product');
      }
    }

    const handleDeleteProduct = async () => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_DELETE_PRODUCT}/${id}`);
            if (data?.success) {
              toast.success('Product deleted successfully');
              setTimeout(() => navigate('/admin-dashboard/products'), 2000 );
            } else {
              toast.error(data?.message || 'Failed to delete product!');
            }
        } catch (error) {
            console.log('Error in delete product', { error });
            toast.error('Failed to delete product');
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
            <CreateProductForm {...data} handleCreateProduct={handleUpdateProduct} handleDeleteProduct={handleDeleteProduct} />
        </div>
    </div>
    </Layout>
  )
}

export default UpdateProduct;