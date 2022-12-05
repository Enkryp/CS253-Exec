import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import axios from 'axios';
import {Alert} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import "../../assets/css/sb-admin-2.css";
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

// import {Auth} from '../../context/AuthContext';

export default function OTPVerification(props) {
   
    // const {googleSignup,facebookSignup,signup,CurrentUser,errorCode,errorMessage,logout}=Auth();  
    const [error,setError]=useState('');
    const history=useHistory();
    const base_url = "http://localhost:8080/";
    const lrs = require('lrs');
    const CryptoJS = require('crypto-js');
    

    async function registerAccount(values){

        let otp=document.getElementById('otp').value;
        let password=document.getElementById('password').value;
        let confirmPassword=document.getElementById('confirmPassword').value; 

        if(otp==='' || password==='' || confirmPassword===''){
            setError('');
            setError('Please fill all the details required');
            return;
        }

        if(confirmPassword!==password){
            setError('');
            setError('Passwords do not match');
            return;
        }

        // axios.defaults.headers.post['Content-Type'] = 'application/json';
        var secretKey=lrs.gen();
        var encryptedKey=CryptoJS.AES.encrypt(secretKey['privateKey'].toString(), password).toString();
        axios.defaults.withCredentials = true;
        await axios
          .post(base_url + "api/GBM/changePassword", {
            "otp":otp,
            "password":password,
            "public": secretKey['publicKey'].toString(),
            "encrypted": encryptedKey,
          })
          .then((res) => {
            if(res.status == 200)
            {
              alert("Signed up successfully. Please proceed to login");
              history.push('/gbm/login');
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
                                <h1 className="h4 text-gray-900 mb-4">OTP Verification</h1>
                            </div>
                            {error && <Alert variant="danger">{ error}</Alert>}
                            <form className="user">
                              
                                <div className="form-group">
                                    <input type="otp" className="form-control form-control-user" id="otp"
                                        placeholder="Enter OTP" />
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" className="form-control form-control-user"
                                            id="password" placeholder="Password" />
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" className="form-control form-control-user"
                                            id="confirmPassword" placeholder="Repeat Password" />
                                    </div>
                                </div>
                                <a className="btn btn-primary btn-user btn-block" onClick={()=>registerAccount()}>
                                    Verify
                                </a>
                                <hr /> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
  

    );
}
