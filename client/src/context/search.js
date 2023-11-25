import { useState, useContext, createContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [ auth, setAuth ] = useState({
        keywords: "",
        results: []
    });

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};

// custom hook
export const useSearch = () => useContext(SearchContext);
