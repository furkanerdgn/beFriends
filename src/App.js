import  {Navigate, useRoutes}  from  "react-router-dom";
import { useSelector } from 'react-redux';
import routes from './routes';
import {Toaster} from 'react-hot-toast';
import React, { useEffect } from "react";


function App() {
    const showRoutes = useRoutes(routes);

 return(
    <>
    <Toaster position='top-right' reverseOrder={false}/>
    {showRoutes};
    </>
    ) 
}

export default App;