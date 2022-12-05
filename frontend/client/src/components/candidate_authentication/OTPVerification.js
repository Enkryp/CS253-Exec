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
  Col,
} from "reactstrap";
import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {Alert} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const OTPVerification = () => {
  const [error,setError]=useState('');
  const history=useHistory();
  const base_url = "http://localhost:8080/";

  async function registerAccount(){

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

    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true;
    await axios
      .post(base_url + "api/candidate/changePassword", {
        "otp":otp,
        "password":password,
      })
      .then((res) => {
        if(res.status == 200)
        {
          alert("Signed up successfully. Please proceed to login");
          history.push('/candidate/login');
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
              <h1>OTP Verification</h1>
          </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
          {error && <Alert variant="danger">{ error}</Alert>}
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-otp-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter OTP"
                    type="otp"
                    id="otp"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    id="password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="confirm-password"
                    id="confirmPassword"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button" onClick={()=>registerAccount()}>
                  Verify
                </Button>
              </div>                          
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default OTPVerification;