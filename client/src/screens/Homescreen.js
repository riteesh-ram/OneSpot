import React from "react";
import Product from '../components/Product'
import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Navbar from "../components/Navbar";

export default function Homescreen() {

    const getallproductsstate = useSelector(
        (state) => state.getAllProductsReducer
      );

    const { loading, products, error } = getallproductsstate;
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllProducts());
    }, [])
    return (
        <div>
            <Navbar/>
            <Filter></Filter>
            <div className="row justify-content-center mt-5 ml-2 mr-2">

            {loading ? (
          <Loader/>
        ) : error ? (
          <Error error="Something went wrong..."/>
        ) : (
            products.map(product=>{
                return <div className='col-md-3 m-2 p-2 shadow p-3 mb-5 bg-white rounded'>
                    <Product product={product}/>
                </div>
            })
           )}

            </div>
        </div>
    )
}