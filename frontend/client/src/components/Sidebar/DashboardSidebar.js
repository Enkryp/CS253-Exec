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
/*eslint-disable*/
import React,{ useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";


// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

var ps;

function DashboardSidebar (props){
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const { logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={
                require("../../assets/img/icons/common/team.jpg").default
              }
            />
          </NavbarBrand>
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/theme/team-1-800x800.jpg")
                        .default
                    }
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/user-profile" tag={Link} >
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem to="" tag={Link}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
           <Nav className="mb-md-3" navbar>
             <NavItem>
              <NavLink href="/candidates">
                <i className="ni ni-ui-04" />
                Candidates List
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/reporting">
                <i className="ni ni-spaceship" />
                Reporting Portal
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="">
                <i className="ni ni-spaceship" />
                Exec
              </NavLink>
            </NavItem>
          </Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
          {/* <h6 className="navbar-heading text-muted">Your Activities</h6> */}
          {/* Navigation */}
          <Nav className="mb-md-3" navbar>
             <NavItem>
              <NavLink href="https://drive.google.com/file/d/1jBJmmoRWsnAe1ONVzfypIaJNi-2MGSdg/view" target="_blank">
                <i className="ni ni-ui-04" />
                Code of Conduct
              </NavLink>
            </NavItem>
             <NavItem>
              <NavLink href="http://localhost:8080/getPenaltyCsv" target="_blank">
                <i className="ni ni-ui-04" />
                Penalty Sheet
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/gbm/login">
                <i className="ni ni-spaceship" />
                GBM Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/gbm/signup">
                <i className="ni ni-palette" />
                GBM Signup
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/candidate/login">
                <i className="ni ni-ui-04" />
                Candidate Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/candidate/signup">
                <i className="ni ni-ui-04" />
                Candidate SignUp
              </NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="/admin/login">
                <i className="ni ni-ui-04" />
                Admin Login
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="">
                <i className="ni ni-spaceship" />
                Exec
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

DashboardSidebar.defaultProps = {
  routes: [{}],
};

DashboardSidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
}

export default DashboardSidebar;
