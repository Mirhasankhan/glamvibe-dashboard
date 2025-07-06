import React from 'react';
import AllServices from './components/AllServices';
import AddService from './components/AddService';

const ServicesPage = () => {
    return (
        <div>
            <h1 className='text-xl font-medium '>Services</h1>
            <p>Manage your services </p>
            <AddService></AddService>
           <AllServices></AllServices>
        </div>
    );
};

export default ServicesPage;