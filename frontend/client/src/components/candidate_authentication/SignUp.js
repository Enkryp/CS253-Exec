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
import axios from "axios";
import { useDispatch } from "react-redux";
import React,{useState} from 'react';

import { Link,useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

const CandidateSignUp = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const base_url = "http://localhost:8080/";
    const [error,setError]=useState('');

    async function registerAccount(){

      let roll_no=document.getElementById('roll_no').value;

      if(roll_no===''){
          setError('');
          setError('Please fill all the details required');
          return;
      }
      
      axios.defaults.withCredentials = true;
      await axios
        .post(base_url+"api/candidate/signup", {
          "roll_no":roll_no,
        })
        .then((res) => {
          if(res.status == 200){
            alert("Please check your IITK email for otp");
            history.push('/candidate/otp-verification');
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
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
            <div className=" text-center mt-2 mb-3">
              <h1>Candidate Signup</h1>
          </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
          {error && <Alert variant="danger">{ error}</Alert>}
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Roll No"
                    type="roll_no"
                    id="roll_no"
                  />
                </InputGroup>
              </FormGroup>
                          
                          <div className="text-center">
                              <Button className="mt-4" color="primary" type="button" onClick={() => registerAccount()}>
                                    Create account
                              </Button>
                              <br/><br/>
                              Already have a account? <Link to="/candidate/login" class="small" >Login</Link>
                              <br/><br/>
                              {/* <Link to="/candidate/forget" class="small" >Forget Password</Link> */}
            </div>
                          
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default CandidateSignUp;