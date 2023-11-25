import React from 'react';
import { useSearch } from '../../context/search';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SEARCH_PRODUCT}/${values.keywords}`);
            setValues({...values, results: data});
            navigate('/search');
        } catch (error) {
            console.log('Error in search product', { error });
            toast.error('Failed to search product');
        }
    }
  return (
    <div>
      <ToastContainer />
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keywords} onChange={e => setValues({...values, keywords: e.target.value})} />
    <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
    </div>
  )
}

export default SearchInput;
