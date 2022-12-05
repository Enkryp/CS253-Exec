// reactstrap components
import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  Table,
  Modal,
  Container,
  Row,
  Button,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
    InputGroup,
  Col
} from "reactstrap";
// core components

import { Link, useHistory} from 'react-router-dom';
import { isJSDocReadonlyTag } from 'typescript';

function ManagePenalty(props) {
    const [notificationModal, setNotificationModal] = useState({ visible: false });
    const [changed, setChanged] = useState(true);
    const [penaltyList, setPenaltyList] = useState([]);
    const history = useHistory();
    const base_url = "http://localhost:8080/";

    useEffect(() => {
      async function fetchData() {
        if(changed == true){
          axios.defaults.withCredentials = true;
          await axios
            .get(base_url + "api/admin/viewAllPenalties")
            .then((response) => {
              setPenaltyList(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          setChanged(false);
        }
      }
      fetchData();
    }, [changed]); 

    const deletePenalty = async(event, id) => {
      event.preventDefault();

      axios.defaults.withCredentials = true;
      await axios
        .post(base_url + "api/admin/removePenalty", {
          "penalty_id": id,
        })
        .then((response) => {
          setChanged(true);
          alert("Penalty deleted");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    const addPenalty = async(event) => {
      event.preventDefault();
      let role = document.getElementById('role').value;
      let roll_no = document.getElementById('roll_no').value;
      let part = "Part " + document.getElementById('part').value;
      let level = "Level " + document.getElementById('level').value;
      let fine = "Rs " + document.getElementById('fine').value;
      let remark = document.getElementById('remark').value;

      console.log("Sending request");
      console.log(role);
      axios.defaults.withCredentials = true;
      await axios
        .post(base_url + "api/admin/addPenalty", {
          "role": role,
          "roll_no": roll_no,
          "part": part,
          "level": level,
          "fine": fine,
          "remark": remark,
          })
        .then((response) => {
          setChanged(true);
          alert("Penalty added");
          toggleModal(false);
        })
        .catch((error) => {
          if(error.response != undefined){
            if(error.response.status === 400 && error.response.data.message != undefined)
              alert(error.response.data.message);
          }
          else
            console.log(error);
        });
    }


    function toggleModal(value) {
      let info={visible:value}
      setNotificationModal(info)
    };

  
    const PenaltyList = penaltyList.map((data) => {
        return (
            <>  
            <tr>
                <th scope="row">
                            <span className="mb-0 text-sm">
                        {data.role} 
                            </span>
                        
                </th>
                <td>{data.name}</td>
                <td>{data.roll_no}</td>
                <td>{data.part}</td>
                <td>{data.level}</td>
                <td>{data.fine}</td>
                <td><Button onClick={(e) => deletePenalty(e, data.id)}>Delete</Button></td>
                </tr>
            </>
        );
    });
  return (
      <>
          <Modal
              className="modal-dialog-centered "
        isOpen={notificationModal.visible}
        toggle={() => toggleModal(notificationModal)}
      >          
        <Card className="bg-secondary shadow border-0 bg-gradient-success">
          <CardHeader className="bg-transparent pb-5">
            <div className=" text-center mt-2 mb-3">
              <h1>Add Penalty</h1>
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
                    required
                    placeholder="Candidate Roll Number"
                                      type="roll_no"
                                      name ="roll_no"
                    autoComplete="new-roll_no"
                    id = "roll_no"
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
                  <Input required type="select" placeholder="Select your post" name = "post" id="role">

                          <option>Enter Role</option>
                          <option>General Body Member</option>
                          <option>Candidate</option>
                    </Input>
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
                    required
                    placeholder="Add Clause"
                                      type="text"
                                      name="clause"
                    autoComplete="new-clause"
                    id="part"
                  />
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
                    required
                    placeholder="Add Level"
                                      type="number"
                                      name = "level"
                    autoComplete="new-level"
                    id="level"
                  />
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
                    required
                    placeholder="Add Fine Amount"
                                      type="numner"
                                      name = "fine"
                    autoComplete="new-fine"
                    id="fine"
                  />
                </InputGroup>
                          </FormGroup>
                          <FormGroup>
                          <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Add Remarks"
                                      type="text"
                                      name = "remark"
                    autoComplete="new-remark"
                    id="remark"
                  />
                </InputGroup>          
                          </FormGroup>
                          
              <div className="text-center">
                <Button block  className="my-4" color="primary" type="button" onClick={(e) => addPenalty(e)} >
                  Add Penalty
                </Button>
                          </div>
             <div className="text-center">
                <Button block className="my-4" color="primary" type="button" onClick={() => toggleModal(false)}>
                  Close
                </Button>
            </div>
            </Form>
          </CardBody>
        </Card>
      </Modal>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            
          </div>
        </Container>
      </div>
          {/* Page content */}
          <>
           
              <Container className="mt--7" fluid>
                  <div width="100%">
                      <Link onClick={() => toggleModal(true)}><b>
                        <Button className="btn-icon btn-2" block color="warning" width="100rem">
                              <span className="btn-inner--icon">
                                <i className="ni ni-bag-17"></i>
                                </span>
                                <span className="btn-inner--text">Add Penalty</span>
                        </Button></b>
                      </Link>
                </div>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                              <h3 className="text-white mb-0">Penalties Imposed</h3>
                              
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Role</th>
                                      <th scope="col">Name</th>
                                      <th scope="col">Roll No</th>
                                      <th scope="col">Clause</th>
                                      <th scope="col">Level</th>
                                          <th scope="col">Fine Amount</th>
                                          <th scope="col">Delete Entry</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  
                    {PenaltyList}
                
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
              </Container>
              </>
    </>
  );
};

export default ManagePenalty;
