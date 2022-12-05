// reactstrap components
import React,{useState, useEffect} from 'react';
import {
  Badge,
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
} from "reactstrap";
// core components

import axios from 'axios';
import { Link, } from 'react-router-dom';

function ManageForms(props) {
    const [notificationModal, setNotificationModal] = useState({ visible: false });
    const [forms, setForms] = useState([]);
    const [changed, setChanged] = useState(true);
    const base_url = "http://localhost:8080/";

    useEffect(() => {
      async function fetchData() {
        if(changed == true){
          axios.defaults.withCredentials = true;
          await axios
            .get(base_url + "api/candidate/viewmyforms")
            .then((response) => {
              setForms(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          setChanged(false);
        }
      }
      fetchData();
    }, [changed]); 

    const add = async(event) => {
      event.preventDefault();
  
      let link = document.getElementById("link").value;
      axios.defaults.withCredentials = true;
      await axios
        .post(base_url + "api/candidate/addform", {
          "form_link": link,
        })
        .then((response) => {
          setChanged(true);
          alert("Form added");
          toggleModal(false);
          // setShowModal(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const remove = async (event, link) => {
      event.preventDefault();
  
      axios.defaults.withCredentials = true;
      await axios
        .post(base_url + "api/candidate/removeform", {
          "form_link": link,
        })
        .then((response) => {
          setChanged(true);
          alert("Form deleted");
          // setShowModal(false);
        })
        .catch((error) => {
          console.log(error.response);
        });
    };

    const formList = forms.map((item) => {
        return (
            <tr>
                    <th scope="row">
                          <span className="mb-0 text-sm">
                            {item.name}
                          </span>
                       
                    </th>
                    <td>
                     <a href={item.link} target="blank">Link</a>
                    </td>
                     <td>
                     <button type="button" class="btn btn-danger" onClick={(e) => remove(e, item.link)}>Delete Form</button>
                    </td>                  
            </tr>
        );
    });
    
    function toggleModal(value) {
      let info={visible:value}
      setNotificationModal(info)
  };
  return (
      <>
      <Modal
              className="modal-dialog-centered "
        isOpen={notificationModal.visible}
        toggle={() => toggleModal(notificationModal)}
      >
          <Card className="bg-gradient-info shadow border-0">
          <CardHeader className="bg-transparent text-white pb-5">
            <div className=" text-center mt-2 mb-3">
              <h1>Add Form Link</h1>
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
                    placeholder="link"
                    type="link"
                    autoComplete="new-link"
                    id = "link"
                  />
                </InputGroup>
            </FormGroup>
            <div className="text-center">
                <Button className="my-4" color="default" type="button" onClick={(e) => add(e)}>
                  Add Link
                </Button>
            </div>
            <div className="text-center">
                <Button className="my-4" color="default" type="button" onClick={() => toggleModal(false)}>
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
      <Container className="mt--7" fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                              <h3 className="text-white mb-0">Manage Forms</h3>
                              <br/>
                              <Link onClick={() => toggleModal(true)}><b><Button color="info">Add Form</Button></b></Link>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Form Name</th>
                    <th scope="col">Form Link</th>
                    <th scope="col">Delete Form</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {formList}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ManageForms;
