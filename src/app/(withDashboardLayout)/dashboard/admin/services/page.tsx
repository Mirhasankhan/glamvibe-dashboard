import React from 'react';
import AllServices from './components/AllServices';
import AddService from './components/AddService';

const ServicesPage = () => {
    return (
        <div>
            <AddService></AddService>
           <AllServices></AllServices>
        </div>
    );
};

export default ServicesPage;