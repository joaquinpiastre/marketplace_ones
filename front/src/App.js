import React, { useState } from 'react'
import "./imagenes/cortadora_pasto.jpg"
import "./imagenes/iphone11.jpg"
import "./imagenes/notebook_Lenovo.jpg"
import "./imagenes/televisor_tcl.jpg"
import { Route, Routes } from 'react-router-dom';
import { UserContext } from "./context/UserContext";
import { PrivateRoutes } from './routes/PrivateRoutes';
import { PublicRoutes } from "./routes/PublicRoutes";
import { Navbar } from "./components/Navbar/Navbar"


export const App = () => {
  const [ user, setUser ] = useState({
    role: '',
    logged: false,
    id: ""
  })

  return (
    <>
      <UserContext.Provider value={{ user, setUser }} >
        <Navbar />
        <Routes>
          {
            user.logged ? (
              <Route path="/*" element={<PrivateRoutes />} /> 
            ):(
              <Route path="/*" element={<PublicRoutes />} />
            )
          } 
        </Routes>
      </UserContext.Provider> 
      
    </>
  );
};
export default App;