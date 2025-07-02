import React from 'react';
import AllEmployees from './components/AllEmployees';
import AddEmployee from './components/AddEmployee';

const EmployeePage = () => {
    return (
        <div>
            <AddEmployee></AddEmployee>
           <AllEmployees></AllEmployees>
        </div>
    );
};

export default EmployeePage;