import { useState, useEffect } from "react";
import {
  CardHeader,
  Table,
  Container,
  Row,
    Button,
    Modal,
    Card,
} from "reactstrap";
// core components

import axios from "axios";

function ViewForms(props) {
    const [formList, setFormList] = useState([]);
    const base_url = "http://localhost:8080/";

    useEffect(() => {
      async function fetchData() {
        axios.defaults.withCredentials = true;
        await axios
          .get(base_url + "api/GBM/viewAllForms")
          .then((response) => {
            setFormList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      fetchData();
    }, []);

    const List_ = formList.map((list) => {
        return (
            <tr>
                    <th scope="row">
                          <span className="mb-0 text-sm">
                            {list.name}
                          </span>
                       
                    </th>
                    <td>
                        <span className="mb-0 text-sm">
                          {list.roll_no}
                        </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center mb-0 text-sm">
                        <a href={list.link} target="_blank" color = "white">{list.link}</a>
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
                    <th scope="col2">Name</th>
                    <th scope="col2">Roll No</th>
                    <th scope="col2">Form Link</th>
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

export default ViewForms;
