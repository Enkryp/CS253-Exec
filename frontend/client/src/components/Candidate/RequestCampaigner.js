// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
    Table,
  Button,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
    Row,
} from "reactstrap";
import axios from "axios";
// core components

import {Link} from 'react-router-dom';

function RequestCampaigner  (props) {
  const base_url = "http://localhost:8080/";

  async function requestCampaigner(event){
    event.preventDefault();
    let roll_no = document.getElementById('roll_no').value;

    axios.defaults.withCredentials = true;
    await axios
      .post(base_url + "api/candidate/requestCampaigner", {
        "gbm_roll_no":roll_no,
      })
      .then((res) => {
        alert("Campigner requested successfully!");
      })
      .catch((err) => {
        if(err.response != undefined){
          if(err.response.data.message != undefined){
            alert(err.response.data.message);
          }
          else{
            console.log(err);
            alert("Some error occured! Please try again later.");
          }
        }
        else {
            console.log(err);
            alert("Some error occured! Please try again later.");
        }
      });
  }
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
       
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Campaign Request</h3>
              </CardHeader>
               <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className=" text-center mt-2 mb-3">
              <h1>Request Campaigner
              </h1>
          </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="roll_no"
                    type="roll_no"
                    autoComplete="new-email"
                    id="roll_no"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={(e) => requestCampaigner(e)}>
                  Request Campaigner
                </Button>
             </div>
            </Form>
          </CardBody>
        </Card>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RequestCampaigner;
