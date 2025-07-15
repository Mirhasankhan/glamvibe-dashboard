import React from "react";
import OrderDetails from "./components/OrderDetails";
import Hotels from "./components/Hotels";
import SalesReport from "./components/SalesReport";
import TopSelling from "./components/TopSelling";
import { ServiceChart } from "./components/ServiceChart";

const OverView = () => {
  return (
    <div>
      <OrderDetails></OrderDetails>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-3 md:col-span-2">
          <SalesReport></SalesReport>
          <TopSelling></TopSelling>
        </div>
        <div className="col-span-3 md:col-span-1">
          <ServiceChart></ServiceChart>
          <Hotels></Hotels>
        </div>
      </div>
    </div>
  );
};

export default OverView;
