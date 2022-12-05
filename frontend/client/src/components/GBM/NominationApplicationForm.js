import React from "react";
import { useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row , Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col,Alert} from "reactstrap";

import { Link, useHistory } from 'react-router-dom';
import axios from "axios";


function NominationApplicationForm  (props) {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const history = useHistory();
  const [Proposercounter, setProposerCounter] = useState(1);
  const [Secondercounter, setSeconderCounter] = useState(2);
  const [notif, setNotif] = useState('');
  const base_url = "http://localhost:8080/";


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

  const addProposer = (event) => {
    setProposerCounter(Proposercounter + 1);
  }

  const deleteProposer = (event) => {
    if(Proposercounter>1) setProposerCounter(Proposercounter - 1);
  }

  const addSeconder = (event) => {
    setSeconderCounter(Secondercounter + 1);
  }

  const deleteSeconder = (event) => {
    if(Secondercounter>2) setSeconderCounter(Secondercounter - 1);
  }

  const FileNomination = async(event) => {
    event.preventDefault();
   
    let post_ = document.getElementById("post").value; 
    const proposers = document.querySelectorAll('[name="proposer"]');
    const proposers_ = [...proposers].map(input => input.value);
    const seconders = document.querySelectorAll('[name="seconder"]');
    const seconders_ = [...seconders].map(input => input.value);
    const manifesto_link_ = document.getElementById("manifesto").value;
    if(post_===''||post_=="Select post to apply for" || proposers_==='' ||seconders_ ==='' ||manifesto_link_===''){
            setNotif('');
            setNotif('Please fill all the details required');
            return;
    }

    console.log(seconders_);
    console.log(proposers_);
    console.log(post_);
    console.log(manifesto_link_);

    axios.defaults.withCredentials = true;
    await axios.post(base_url + "api/GBM/fileNomination", {
      "Seconders": seconders_,
      "Proposers": proposers_,
      "manifesto_link": manifesto_link_,
      "post": post_,
    })
    .then((response) => {
      alert("Nomination Successful");
      history.push("/gbm/dashboard");
    })
    .catch((error) => {
      if(error.response != undefined){
        if(error.response.data.message != undefined){
          setNotif('');
          setNotif(error.response.data.message);
        }
        else{
          console.log(error.response);
          setNotif('');
          setNotif('Something went wrong, Please try again later!');
        }
      }
      else{
        console.log(error);
        setNotif('');
        setNotif('Something went wrong, Please try again later!');
      }
    });
  }

  return (
    <>
      <div className="main-content" ref={mainContent}>
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
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
             <Col lg="6" md="5" className="justify-content-center">
            <Card className="bg-secondary shadow border-0" style={{width:"130%", height:"100%"}}>
          <CardHeader className="bg-transparent pb-5">
            <div className=" text-center mt-2 mb-3">
              <h1>Nomination Form</h1>
          </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">
                     {notif && <Alert color="dark">{notif}</Alert>}
                    <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                        <Input type="select" placeholder="Select post to apply for" id="post">

                          <option disabled selected>Select post to apply for</option>
                          <option>President,Student Gymkhana</option>
                          <option>General Secretary,Science and Technology</option>
                          <option>Senator Y20</option>
                          <option>Senator Y19</option>
                           <option>Senator Y18</option>
                    </Input>
                </InputGroup>
                    </FormGroup>
                    {Array.from(Array(Proposercounter)).map((c, index) => {
                        return (
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Enter your Proposer Roll No"
                                key={c}
                                type="proposer"
                                autoComplete="new-proposer"
                                name = "proposer"
                              />
                            </InputGroup>
                          </FormGroup>
                        );
                      })}
                     <FormGroup>
                      <InputGroup className="input-group-alternative">

                   <Button className="btn-icon btn-2" block color="warning" width="100rem" onClick={(event)=>addProposer(event)}>
                              <span className="btn-inner--icon">
                                <i className="ni ni-bag-17"></i>
                                </span>
                                <span className="btn-inner--text">Add Proposers</span>
                        </Button>
                </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">

                   <Button className="btn-icon btn-2" block color="warning" width="100rem" onClick={(event)=>deleteProposer(event)}>
                              <span className="btn-inner--icon">
                                <i className="ni ni-bag-17"></i>
                                </span>
                                <span className="btn-inner--text">Delete Proposers</span>
                        </Button>
                </InputGroup>
                    </FormGroup>
                    {Array.from(Array(Secondercounter)).map((c, index) => {
                        return (
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Enter your Seconder Roll No"
                                key={c}
                                type="seconder"
                                autoComplete="new-seconder"
                                name = "seconder"
                              />
                            </InputGroup>
                          </FormGroup>
                        );
                      })}
                      <FormGroup>
                      <InputGroup className="input-group-alternative">

                        <Button className="btn-icon btn-2" block color="warning" width="100rem" onClick={(event) => addSeconder(event)}>
                              <span className="btn-inner--icon">
                                <i className="ni ni-bag-17"></i>
                                </span>
                                <span className="btn-inner--text">Add Seconders</span>
                        </Button>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">

                        <Button className="btn-icon btn-2" block color="warning" width="100rem" onClick={(event) => deleteSeconder(event)}>
                              <span className="btn-inner--icon">
                                <i className="ni ni-bag-17"></i>
                                </span>
                                <span className="btn-inner--text">Delete Seconders</span>
                        </Button>
                      </InputGroup>
                    </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter your manifesto link"
                    type="manifesto"
                          autoComplete="new-manifesto"
                          id = "manifesto"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={(event)=> FileNomination(event)}>
                  File Nomination
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default NominationApplicationForm;