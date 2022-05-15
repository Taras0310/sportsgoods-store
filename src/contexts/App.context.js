import React, { useContext, useState, useEffect } from 'react';
import Api from '../api';
import { useLocalStorage } from '../hooks/useLocalStorabge';

const AppContext = React.createContext();

export function useStore(){
    return useContext(AppContext);
}

export default function AppProvider({children}) {
    const [categories, setCategories] = useState(null)
    const [products, setProducts] = useState(null)

    const [queryFilters, setQueryFilters] = useLocalStorage('query_filters', [])
    const [currentCategoryObject, setCurrentCategoryObject] = useLocalStorage('current_category', {})

    useEffect(()=> {
        Api.getAllCategories().then(categoriesResponse => setCategories(categoriesResponse))
    }, [])
    
    function clearFilter(){
        setQueryFilters({})
        setCurrentCategoryObject({})
      }
    const value = {
        categories,
        products,
        queryFilters,
        setQueryFilters,
        currentCategoryObject,
        setCurrentCategoryObject,
        clearFilter,
        categories, 
        setCategories
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}