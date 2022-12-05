import React from 'react';
import {BrowserRouter as Switch,Route, Redirect,BrowserRouter} from "react-router-dom";
import SignUp from './components/gbm_authentication/SignUp';
import SignIn from './components/gbm_authentication/SignIn';
import ForgetPassword from './components/gbm_authentication/ForgetPassword';
import OTPVerification from 'components/gbm_authentication/OTPVerification';
import MainDashboardLayout from "layouts/MainDashboard.js";
import CandidateDashboard from 'components/Dashboard/CandidateDashboard';
import GBMLayout from "layouts/GBMLayout.js";
import CandidateLayout from "layouts/CandidateLayout";
import PageNotFound from 'views/examples/404Page';
import ReportingPortal from 'components/Dashboard/ReportingPortal';
import AdminLayout from 'layouts/AdminLayout.js';
import AdminDashboard from 'components/Dashboard/AdminDashboard';
import { PublicRoutes } from 'PublicRoutes';
import { CandidateRoutes } from 'CandidateRoutes';
import { GBMRoutes } from 'GBmRoutes';
import { AdminRoutes } from 'AdminRoutes';
import { CommonRoutes } from 'CommonRoutes';

export default function RoutingComponent(props) {
    return (   
    <BrowserRouter>
        <Switch>
          
        <Route path="/argon-dashboard-react">
            <Redirect to="/candidates" />
        </Route>
          
        <Route exact path="/">
            <Redirect to="/candidates" />
        </Route>

        {/* common routes */}

        <CommonRoutes component={MainDashboardLayout} path="/info/:id"  exact />
        <CommonRoutes component={ReportingPortal} path="/reporting" exact />
        <CommonRoutes exact path="/pagenotfound" component={PageNotFound} />

        {/* general routes */}
        <PublicRoutes component={MainDashboardLayout} path="/candidates" exact />
        <PublicRoutes component={CandidateLayout} path="/candidate/login" exact />
        <PublicRoutes component={CandidateLayout} path="/candidate/signup" exact />
        <PublicRoutes component={CandidateLayout} path="/candidate/otp-verification" exact/>
        <PublicRoutes component={AdminLayout} path="/admin/login" exact />
        <PublicRoutes component={SignIn} path="/gbm/login" exact/>
        <PublicRoutes component={SignUp} path="/gbm/signup" exact/>
        <PublicRoutes component={OTPVerification} path="/gbm/otp-verification" exact/>


        {/* candidate routes         */}

        <CandidateRoutes component={CandidateDashboard} path="/candidate/dashboard" exact/>
        <CandidateRoutes component={CandidateDashboard} path="/candidate/add-videos" exact/>
        <CandidateRoutes component={CandidateDashboard} path="/candidate/add-posters" exact/>
        <CandidateRoutes component={CandidateDashboard} path="/candidate/manage-forms" exact/>
        <CandidateRoutes component={CandidateDashboard} path="/candidate/request-campaigner" exact/>
        <CandidateRoutes component={CandidateDashboard} path="/candidate/profile" exact/>
        
        
        {/* gbm routes */}
       
        <GBMRoutes component={GBMLayout} path="/gbm/dashboard" exact/>
        <GBMRoutes component={GBMLayout} path="/gbm/nomination" exact/>
        <GBMRoutes component={GBMLayout} path="/gbm/campaign-request" exact/>
        <GBMRoutes component={GBMLayout} path="/gbm/view-forms" exact/>
        <GBMRoutes component={GBMLayout} path="/gbm/profile" exact/>
        {/* admin routes */}
   
        <AdminRoutes component={AdminDashboard} path="/admin/dashboard" exact/>
        <AdminRoutes component={AdminDashboard} path="/admin/view-nominations" exact/>
        <AdminRoutes component={AdminDashboard} path="/admin/manage-penalty" exact/>
        <AdminRoutes component={AdminDashboard} path="/admin/view-reports" exact/>
        <AdminRoutes component={AdminDashboard} path="/admin/info/:id" exact/> 
        
    </Switch>
  </BrowserRouter>
       
    )
}