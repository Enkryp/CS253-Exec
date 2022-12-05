import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import "../../assets/css/sb-admin-2.css";
import axios from 'axios';
import { signup } from 'actions/userActions';
import {useDispatch} from 'react-redux';
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { isConstructorDeclaration } from 'typescript';
// import {Auth} from '../../context/AuthContext';

export default function SignUp(props) {
   
    const [error,setError]=useState('');
    const history=useHistory();
    // const base_url = "https://exec-backend.herokuapp.com/";
    const base_url = "http://localhost:8080/";
    

    async function registerAccount(values){

        let roll_no=document.getElementById('roll_no').value;

        if(roll_no===''){
            setError('');
            setError('Please fill all the details required');
            return;
        }
        axios.defaults.withCredentials = true;
        await axios
          .post(base_url+"api/GBM/signup", {
            "roll_no":roll_no,
          })
          .then((res) => {
            if(res.status == 200){
              alert("Please check your IITK email for otp");
              // dispatch(signup(roll_no, "GBM"));
              history.push('/gbm/otp-verification');
            }
          })
          .catch((err) => {
            if(err.response != undefined){
              if(err.response.status == 400){
                console.log(err);
                alert("Some error occured! Please try again later.");
              }
              else if(err.response.status == 401){
                setError('');
                setError(err.response.data.message);
              }
            }
            else{
              console.log(err);
              alert("Some error occured! Please try again later.");
            }
          });

    }

    const dispatch = useDispatch();
    return (
      <div style={{backgroundColor:"lightsteelblue",right:0,bottom:0,left:0,top:0,position:"fixed"}}>
            <div className="container">
                <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/#" tag={Link}>
            Exec
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/brand/argon-react.png")
                          .default
                      }
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/candidate/login" tag={Link}>
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Candidate_Login</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/candidates" tag={Link}>
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Dashboard</span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>


        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                <div className="row">
                    <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div className="col-lg-7">
                        <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            {error && <Alert variant="danger">{ error}</Alert>}
                            <form className="user">
                              
                                <div className="form-group">
                                    <input type="roll_no" className="form-control form-control-user" id="roll_no"
                                        placeholder="Roll no" />
                                </div>
                                {/* <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" className="form-control form-control-user"
                                            id="password" placeholder="Password" />
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" className="form-control form-control-user"
                                            id="confirmPassword" placeholder="Repeat Password" />
                                    </div>
                                </div> */}
                                <a className="btn btn-primary btn-user btn-block" onClick={()=>registerAccount()}>
                                    Register Account
                                </a>
                                <hr /> 
                                {/* <a  className="btn btn-google btn-user btn-block" >
                                    <i class="fab fa-google fa-fw"></i> Register with Google
                                </a>
                                <a className="btn btn-facebook btn-user btn-block">
                                    <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                </a> */}
                            </form>
                            <hr />
                            {/* <div className="text-center">
                                <Link to="/gbm/forget" className="small" >Forgot Password?</Link>
                            </div> */}
                            <div className="text-center">
                                <Link to="/gbm/login" className="small">Already have an account? Login!</Link>
                            </div>
                            {/* <div className="text-center">
                                <Link  className="small">Logout</Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
  

    );
}
