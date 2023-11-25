import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategory = () => {
    const [ categories, setCategories ] = useState([]);

    const getCategories = async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_GET_ALL_CATEGORIES);
            setCategories(data.categories);
        } catch (error) {
            console.log('Error in get category use state hook', { error });
        }
    }
    
    useEffect(() => {
        getCategories();
    }, []);

    return categories;
}

export default useCategory;
