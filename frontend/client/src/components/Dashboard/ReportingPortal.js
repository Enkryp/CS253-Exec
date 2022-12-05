import React,{Component} from "react";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {CryptoJS} from 'crypto-js';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Row,
  Col,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";


function ReportingPortal  (props) {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const base_url = "http://localhost:8080/";
  const [keys, setKeys] = useState([]);
  const lrs = require('lrs');
  const CryptoJS = require('crypto-js');

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  React.useEffect(() => {
    async function fetchData() {
      axios.defaults.withCredentials = true;
      await axios
        .get(base_url + "api/report/keys/public")
        .then((response) => {
          setKeys(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  async function addReport(event){
    event.preventDefault();
    //TODO: first fetch main data nahi aa rha
    console.log(keys);

    let roll_no = prompt("Please enter your roll number");

    if(roll_no == null || roll_no == ""){
      alert("No roll number added");
      return;
    }

    var roll_key = keys.find((obj) => {return (obj.roll == roll_no)});

    if(roll_key == undefined){
      alert("This roll no hasn't signed up yet");
      return;
    }

    let pub_keys = [];
    keys.forEach((obj) => {pub_keys.push(obj.publicKey)} );

    let password = prompt("Please enter your password");
    if(password == null || password == ""){
      alert("No password filled in");
      return;
    }
    
    var bytes = CryptoJS.AES.decrypt(roll_key.encryptedPriv, password);
    try{
      var decryptedPriv = bytes.toString(CryptoJS.enc.Utf8);
    }
    catch(err){
      alert("Wrong password");
      return;
    }
    let message = document.getElementById("message").value;
    var secretKey={"publicKey":roll_key.publicKey, "privateKey": decryptedPriv };

    var signed = lrs.sign(pub_keys, secretKey, message);

    await axios
      .post(base_url + "api/report/post/", {
        "message": message,
        "signed": signed,
      })
      .then((response) => {
        alert("Report added successfully");
      })
      .catch((error) => {
        if(error.response != undefined && error.response.status == 401){ 
          alert("Invalid password");
        }
        else{
          console.log(error);
          alert("some error took place");
        }
      });
    
  } 

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="#" tag={Link}>
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
                <NavLink className="nav-link-icon" to="/candidates" tag={Link}>
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Dashboard</span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
        <div className="header bg-gradient-info py-7 py-lg-8">         
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
                          />
                          
            </svg>
          </div>
        </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <Col lg="10" md="20">
        <Card className="bg-secondary shadow border-0 ">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h1>Anonymous Reporting Portal</h1>
            </div>
            <Form role="form">
                <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Description of the Complaint/Proof"
                    type="textarea"
                    autoComplete="rollno"
                        max-height="100px"
                        class="textarea"
                         rows="20" cols="100"
                    id="message"
                  />
                  </InputGroup>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                      <span className="text-muted"> 
                      <h3>Note:</h3> This portal is completely anonymous. Add a proper description of the complaint.
                      <br />
                      </span>
                    
                </Col>
                </Row>
                <Row className="my-4">
                    <Col sm="12" style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>

                      <Button className="mt-4" color="primary" type="button" onClick={(e) => addReport(e)}>
                          Report
                      </Button>   
                  </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
          </Col>  
      </div>    
        </div>
          
    </>
  );
};

export default ReportingPortal;
