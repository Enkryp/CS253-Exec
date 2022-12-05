import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route} from 'react-router-dom';

export function PublicRoutes(props){
    const access_level = sessionStorage.getItem("access_level");
    const {component:Component, ...rest } = props;
    const render  = props => {

        if(access_level == "GBM"){
            return <Redirect to="/gbm/dashboard" />
        }

        if(access_level == "Candidate"){
            return <Redirect to="/candidate/dashboard" />
        }

        if(access_level == "Admin"){
            return <Redirect to="/admin/dashboard" />
        }

        return <Component {...props} />
         
    }
    return <Route {...rest} render={render} /> ;

}