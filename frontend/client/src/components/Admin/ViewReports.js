import { useState, useEffect } from "react";
import {
  CardHeader,
  Table,
  Container,
  Row,
    Button,
    Modal,
    Card,
    CardBody,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Input,
} from "reactstrap";
// core components
import axios from "axios";
import { Link } from "react-router-dom";

function ViewReports(props) { 
    const base_url = "http://localhost:8080/";
    const [reportList, setReportList] = useState([]);
    const [notificationModal, setNotificationModal] = useState({content:"",visible:false});


    function toggleModal(value,item) {
        let info={content:item,visible:value}
        setNotificationModal(info)
    };

    useEffect(() => {
      async function fetchData() {
        axios.defaults.withCredentials = true;
        await axios
          .get(base_url + "api/report/view")
          .then((response) => {
            setReportList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      fetchData();
    }, []); 

    const List_ = reportList.map((list,index) => {
        return (
            <tr>
                    <th scope="row">
                          <span className="mb-0 text-sm">
                            {index + 1}
                          </span>
                       
                    </th>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button className="btn-icon btn-2" block color="default" width="100rem" onClick={()=>toggleModal(true,list)}>
                              <span className="btn-inner--icon">
                                <i className="ni ni-bag-17"></i>
                                </span>
                                <span className="btn-inner--text">View Complete Details</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
        );
    });
  return (
      <>
     <Modal
        className="modal-dialog-centered modal-default"
        contentClassName="bg-gradient-default"
        isOpen={notificationModal.visible}
        toggle={() => toggleModal(notificationModal)}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-notification">
            Report Details
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => toggleModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        {notificationModal.visible &&
          <div className="modal-body">
            <div className="py-3 text-center">
              <p overflow-wrap="break-word">
              {notificationModal.content.message}
              </p>
            </div>
          </div>
        }
        <div className="modal-footer">
          <Button
            className="text-white ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => toggleModal(false)}
          >
            Close
          </Button>
        </div>
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
          <div className="col"  width="80">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Report Details</h3>
              </CardHeader>
              <Table
                              className="align-items-center table-dark table-flush table-sm"
                              
                              responsive
              >
                <thead className="thead-dark">
                   <tr>
                    <th scope="col2">Report Number</th>
                    <th scope="col2"></th>
                  </tr>
                </thead>
                <tbody>
                  {List_}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewReports;
