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
import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { login } from 'actions/userActions';
import { useDispatch } from 'react-redux';

function AdminLogin (props) {
  const [error,setError]=useState('');
  const history=useHistory();
  const base_url = "http://localhost:8080/";
  const dispatch = useDispatch();

  async function loginUser(){
    let password=document.getElementById('password').value;

    if(password == ''){
        setError('');
        setError('Please fill all the details required');
        return;
    }

    axios.defaults.withCredentials = true;
    await axios
      .post(base_url + "api/admin/login", {
        "password":password,
      })
      .then((res) => {
        if(res.status == 200){
            dispatch(login(0, "Admin"));
            window.location.href = '/admin/dashboard';
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
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className=" text-center mt-2 mb-3">
              <h1>Admin Login</h1>
          </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
          {error && <Alert variant="danger"> {error}</Alert>}
            <Form role="form">
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
                    autoComplete="password"
                    id="password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={()=> loginUser()}>
                  Log in
                </Button>
                          </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default AdminLogin;
