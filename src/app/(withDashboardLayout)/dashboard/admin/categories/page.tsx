import React from 'react';
import AddCategory from './components/AddCategory';
import AllCategories from './components/AllCategories';

const CategoriesPage = () => {
    return (
        <div>
            <h1 className='text-xl font-semibold'>Categories</h1>
            <p>Organize your content with custom categories</p>
            <AddCategory></AddCategory>
            <AllCategories></AllCategories>
        </div>
    );
};

export default CategoriesPage;