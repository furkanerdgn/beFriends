import  {useRoutes}  from  "react-router-dom";
import { useSelector } from 'react-redux';
import routes from './routes';
import {Toaster} from 'react-hot-toast';
import React, { useEffect } from "react";
import Loader from "./components/Loader";


function App() {
    
    const user = useSelector(state => state.auth.user)

    const showRoutes = useRoutes(routes);
    

    /*if(!user){
        return <Loader/>
    }*/
 
 return(
    <>
    <Toaster position='top-right' reverseOrder={false}/>
    {showRoutes};
    </>
    ) 
}

export default App;