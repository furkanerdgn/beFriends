import { Navigate,useLocation } from "react-router-dom";
import {useSelector}   from 'react-redux';


export default function PrivateRoute({ children, ...rest }) {
    
    const user = useSelector(state => state.auth.user);
    const location = useLocation()

    if(!user){
        return <Navigate replace={true} state={{return_url:location.pathname}} to="/auth/login" />
    } 
    return children
}   