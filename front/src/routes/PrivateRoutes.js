import React from 'react'
import { Route, Routes} from "react-router-dom";
import { UserList } from '../components/UserList/UserList';
import { Home } from '../components/Home/Home';
import { AddProduct } from '../components/AddProducts/AddProducts';
import { ProductList } from '../components/ProductList/ProductList';
import { ListBuy } from "../components/myBuys/myBuys";

export const PrivateRoutes = () => {
  return (
    <Routes>
        <Route path='/home' element={ <Home />} />
        <Route path='/userlist' element={<UserList />} />
        <Route path='/myBuys' element={<ListBuy />} />
        <Route path='/products' element={<ProductList/>} />
        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='*' element= {<Home/>} />
    </Routes>
  )
}