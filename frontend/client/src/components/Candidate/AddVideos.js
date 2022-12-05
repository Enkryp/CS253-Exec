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
import axios from 'axios';
// core components

import { Link, } from 'react-router-dom';

function AddVideos(props) {
    const [notificationModal, setNotificationModal] = useState({ visible: false });
    const base_url = "http://localhost:8080/";
    const [changed, setChanged] = useState(true);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
      async function fetchData() {
        if(changed == true){
          axios.defaults.withCredentials = true;
          await axios
            .get(base_url + "api/candidate/viewmyvideos")
            .then((response) => {
              setVideos(response.data);
            })
            .catch((error) => {
              alert("Some error occured please try again");
              console.log(error);
            });
          setChanged(false);
        }
      }
      fetchData();
    }, [changed]); 

    async function addVideo(event) {
      event.preventDefault();
      let link = document.getElementById("link").value;

      await axios
        .post(base_url + "api/candidate/addVideos", {
          "video_link": link,
        })
        .then((response) => {
          setChanged(true);
          alert("Video added");
          toggleModal(false);
        })
        .catch((error) => {
          alert("Some error occured please try again");
          console.log(error);
        });
      };

    
    function toggleModal(value) {
      let info={visible:value}
      setNotificationModal(info)
    };

  const videoList = videos.map((video) => {
    return(
      <tr>
        <th scope="row">
              <span className="mb-0 text-sm">
                {video.name}
              </span>
            
        </th>
        <td>
          <a href = {video.link} target="blank"><button type="button" class="btn btn-success">Video Link</button></a>
        </td>
      </tr>
    )
  });
  return (
      <>
        <Modal
        isOpen={notificationModal.visible}
        toggle={() => toggleModal(notificationModal)}
      >
       
        <Card className="bg-gradient-info shadow border-0">
          <CardHeader className="bg-transparent pb-5" tag="h3">
            <div className=" text-center mt-2 mb-3">
              <h1>Add Video Link</h1>
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
                    id="link"
                  />
                </InputGroup>
              </FormGroup>
            <div className="text-center">
                <Button className="my-4" color="default" type="button" onClick={(e) => addVideo(e)}>
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
                              <h3 className="text-white mb-0">Videos</h3>
                              <br/>
                              <Link onClick={() => toggleModal(true)}><b><Button color="info">Add Video</Button></b></Link>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Video Name</th>
                    <th scope="col">Video Link</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {videoList}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AddVideos;
