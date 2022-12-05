import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import {useLocation} from "react-router-dom";


function Layout({children}){
    const location = useLocation()

    return <React.Fragment>
        {
            location.pathname==='/login' || location.pathname==='/registration'?null:<Nav/>
        }
        {children}
        {
            location.pathname==='/login'|| location.pathname==='/registration'?null:<Footer/>
        }

    </React.Fragment>
}

export default Layout