/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link,useHistory} from "react-router-dom";
// import {Auth} from '../../context/AuthContext';
// reactstrap components
import {
  Navbar,
  Container,
} from "reactstrap";

function DashboardNavbar (props) {
  // const {CurrentUser,logout}= Auth();
  const history=useHistory();
  function Logout(){
    // logout();
    history.push('/gbm/login');
  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block "
          >
            {/* <h1>CANDIDATES</h1> */}
          </Link>
        </Container>
      </Navbar>
    </>
  );
}

export default DashboardNavbar;
