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

import NominationFormHeader from "./NominationFormHeader";
import axios from "axios";

const NominationApplicationList = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const base_url = "http://localhost:8080/";
  const [filteredCandidates,setFilteredCandidates] = useState({});
  const history = useHistory();

  useEffect(() => {
    const params = props.match.params;
    // console.log(params.id);

    async function fetchData() {

      axios.defaults.withCredentials = true;
      await axios
        .get(base_url + "api/admin/viewNomination", { params: {roll_no: params.id} })
        .then((response) => {
          setFilteredCandidates(response.data);
        })
        .catch((error) => {
          console.log(error);
          alert("No such nomination exists");
          history.push("/admin/view-nominations");
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
      <NominationFormHeader candidate={filteredCandidates}/>
     
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Manifesto
                    </h6>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* <div className="chart"> */}
                  {/* <CardImg
                  alt="..."
                  src={require("./no_poster.jpg").default}
                  top
                ></CardImg> */}
                <iframe src={filteredCandidates.manifesto} width="1000" height="1000" allow="autoplay">
                </iframe>
                {/* </div> */}
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardBody> 
                {/* <div className="chart"> */}
                  <CardImg
                  alt="..."
                  src={require("./anonymous_profile.jpg").default}
                  top
                ></CardImg>
                {/* </div> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
     
    </>
    
  );
};

export default NominationApplicationList;
