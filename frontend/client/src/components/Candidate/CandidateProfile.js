// reactstrap components
import React,{useState, useEffect} from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
//import {Auth } from '../../context/AuthContext';
import axios from 'axios';

function CandidateProfile (props){

  // const {CurrentUser} =Auth();
  const[disable,setDisable] =useState(true); 
  const [profile,setProfile] = useState({});
  const base_url = "http://localhost:8080/";

  useEffect(() => {
    async function fetchData() {
      axios.defaults.withCredentials = true;
      await axios
        .get(base_url + "api/candidate/profile")
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  const proposers = (profile.Proposers)?.map((proposer) => {
    return(
      <Input
        className="form-control-alternative"
        defaultValue="Proposer"
        id="input-proposer"
        type="text"
        value={proposer}
        disabled={disable}
      />
    )
  });

  const seconders = (profile.Seconders)?.map((seconder) => {
    return(
      <Input
        className="form-control-alternative"
        defaultValue="Seconder"
        id="input-seconder"
        type="text"
        value={seconder}
        disabled={disable}
      />
    )
  });

  const campaigners = (profile.Campaigners)?.map((campaigner) => {
    return(
      <Input
        className="form-control-alternative"
        defaultValue="Campaigner"
        id="input-campaigner"
        type="text"
        value={campaigner}
        disabled={disable}
      />
    )
  });

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/icons/common/profile.jpg")
                            .default
                        }
                      />
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">      
              </CardHeader><br/><br/><br/><br/>
              <CardBody className="pt-0 pt-md-4">
                <div className="text-center">
                  <h3>
                  </h3>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                   Candidate
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    Indian Institute of Technology,Kanpur
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Name"
                            value={profile.name}
                            type="text"
                            disabled={disable}
                          /> 
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Roll no.
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-roll_no"
                            placeholder="Roll no"
                            type="text"
                            value={profile.roll_no}
                            disabled ={disable}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Contesting for the post of
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Post"
                            id="input-first-name"
                            placeholder="Post"
                            type="text"
                            value={profile.post}
                            disabled={disable}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Manifesto Link
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Manifesto"
                            id="input-first-name"
                            placeholder="Manifesto"
                            type="url"
                            value={profile.manifesto_link}
                            disabled={disable}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Other Additional Info
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-college"
                          >
                            Proposers
                          </label>
                          {proposers}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-college"
                          >
                            Seconder
                          </label>
                          {seconders}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-college"
                          >
                            Campaigners
                          </label>
                          {campaigners}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CandidateProfile;
