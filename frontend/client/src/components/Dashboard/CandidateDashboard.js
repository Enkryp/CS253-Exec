import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// core components
import CandidateDashboardNavbar from "components/Navbars/CandidateDashboardNavbar.js";
import CandidateDashboardSidebar from "components/Sidebar/CandidateDashboardSidebar.js";
import candidate_routes from "candidate_routes.js";
function CandidateDashboard (props){
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (candidate_routes) => {
    return candidate_routes.map((prop, key) => {
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
      <CandidateDashboardSidebar/>
      <div className="main-content" ref={mainContent}>
        <CandidateDashboardNavbar/>
        <Switch>
          {getRoutes(candidate_routes)}
          <Redirect from="*" to="/pagenotfound" />
        </Switch>
      </div>
    </>
  );
}

export default CandidateDashboard;