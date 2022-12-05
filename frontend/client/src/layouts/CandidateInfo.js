
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
// node.js library that concatenates classes (strings)

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  CardImg
} from "reactstrap";
import axios from "axios";

import CandidateInfoHeader from "./CandidateInfoHeader";

const CandidateInfo = (props) => {
  const history = useHistory();
  const [activeNav, setActiveNav] = useState(1);
  const base_url = "http://localhost:8080/";

  const [filteredCandidates,setFilteredCandidates] = useState({});
  useEffect(() => {
    const params = props.match.params;
    // console.log(params.id);

    async function fetchData() {
      axios.defaults.withCredentials = true;
      await axios
        .get(base_url + "viewCandidate/", { params: {roll_no: params.id} })
        .then((response) => {
          setFilteredCandidates(response.data);
        })
        .catch((error) => {
          alert("No such candidate exists");
          history.push("/candidates");
        });
    }
    
    fetchData();
  },[]);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };
  return (
    <>
      <CandidateInfoHeader candidate={filteredCandidates}/>
     
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Poster
                    </h6>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                  <CardImg
                  className="image-fluid"
                  alt="Candidate hasn't Included a Poster Yet"
                  src={filteredCandidates && filteredCandidates.poster_link}
                  top
                ></CardImg>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardBody> 
                  <CardImg
                  alt="..."
                  src={require("./photo.png").default}
                  top
                ></CardImg>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
     
    </>
    
  );
};

export default CandidateInfo;
