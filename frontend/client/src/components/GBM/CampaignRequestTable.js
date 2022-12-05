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
  Container,
    Row,
  Button,
} from "reactstrap";
// core components

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function CampaignTables(props) {
  
  const [requester,setRequester] = useState([]);
  const [changed, setChanged] = useState(true);
  const base_url = "http://localhost:8080/";
  
  
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      if(changed == true){
        axios.defaults.withCredentials = true;
        await axios
          .get(base_url + "api/GBM/campaignRequests")
          .then((response) => {
            setRequester(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        setChanged(false);
      }
    }
    fetchData();
  }, [changed]);

  const accept = async(event, roll_no) => {
    event.preventDefault();

    axios.defaults.withCredentials = true;
    await axios
      .post(base_url + "api/GBM/acceptCampaignRequest", {
        "roll_no_candidate": roll_no,
      })
      .then((response) => {
        setChanged(true);
        alert("Campaign request accepted");
        // setShowModal(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const reject = async(event, roll_no) => {
    event.preventDefault();

    axios.defaults.withCredentials = true;
    await axios
      .post(base_url + "api/GBM/rejectCampaignRequest", {
        "roll_no_candidate": roll_no,
      })
      .then((response) => {
        setChanged(true);
        alert("Campaign request rejected");
        // setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const details = (event,id) => {
  //   history.push('/info/'+id);
  //   event.preventDefault();
  // }

  const requesterList = requester.map((item) => {
    return (
            <tr>
                    <th scope="row">
                          <span className="mb-0 text-sm">
                            {item.name}
                          </span>
                       
                    </th>
                      <td>{item.post}</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        {item.roll_no}           
                      </Badge>
                    </td>
                    <td>
                     <button type="button" class="btn btn-success" onClick={(e) => accept(e, item.roll_no)}>Accept</button>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button type="button" class="btn btn-danger" onClick={(e) => reject(e, item.roll_no)}>Decline</button>
                      </div>
                    </td>
                  </tr>
    );
  });
  
  
  return (
    <>
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
                <h3 className="text-white mb-0">Campaign Request</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Candidate Name</th>
                    <th scope="col">Contesting for</th>
                    <th scope="col">Roll Number</th>
                    <th scope="col">Accept</th>
                    <th scope="col">Reject</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                    {requesterList}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CampaignTables;
