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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import {useHistory,Link} from 'react-router-dom';

function CandidateForgetPassword (props) {
  const history=useHistory();
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className=" text-center mt-2 mb-3">
              <h1>Forget Password</h1>
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
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button">
                  Reset Password
                </Button>
             </div>
                          
              <div className="text-center">
                              <Link to="/candidate/login" class="small" >Login</Link>
                              <br/><br/>
                              <Link to="/candidate/signup" class="small" >Signup</Link>
            </div>
                          
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default CandidateForgetPassword;
