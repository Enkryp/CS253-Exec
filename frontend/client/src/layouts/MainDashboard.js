import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import DashboardSidebar from "components/Sidebar/DashboardSidebar.js";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import routes from "routes.js";
import CandidateInfo from "./CandidateInfo";

function MainDashboardLayout (props){
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <DashboardSidebar
        {...props}
        logo={"Exec"}
      />
      <div className="main-content" ref={mainContent}>
        <DashboardNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          <Route exact path="/info/:id" render={(props) => <CandidateInfo {...props} />} /> 
          <Redirect from="*" to="/pagenotfound" />
        </Switch>
      </div>
    </>
  );
}

export default MainDashboardLayout;
