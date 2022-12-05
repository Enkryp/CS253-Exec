import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// core components
import GBMDashboardNavbar from "components/Navbars/GBMDashboardNavbar.js";
import GBMDashboardSidebar from "components/Sidebar/GBMDashboardSidebar.js";
import gbm_routes from "gbm_routes.js";
function GBMLayout (props){
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (gbm_routes) => {
    return gbm_routes.map((prop, key) => {
      if (prop.layout === "/ouradmin") {
        return (
          <Route
            exact path={prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <GBMDashboardSidebar/>
      <div className="main-content" ref={mainContent}>
        <GBMDashboardNavbar/>
        <Switch>
          {getRoutes(gbm_routes)}
          <Redirect from="*" to="/pagenotfound" />
        </Switch>
      </div>
    </>
  );
}

export default GBMLayout;