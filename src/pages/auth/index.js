import {Outlet} from 'react-router-dom';

export default function AuthLayout(){
    return(
        <section className="h-full w-full mt-10">
            <Outlet/>
        </section>
    )
}