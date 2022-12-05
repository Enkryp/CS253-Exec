import React from 'react';
import { Route, Redirect} from 'react-router-dom';

export function GBMRoutes(props){
    const accesslevel = sessionStorage.getItem("access_level");
    const {component:Component, ...rest} = props;
    const render  = props => {
        if(accesslevel != "GBM"){
            return <Redirect to="/gbm/login"/>
        }
        return <Component {...props} />
         
    }
    return <Route {...rest} render={render} /> ;

}