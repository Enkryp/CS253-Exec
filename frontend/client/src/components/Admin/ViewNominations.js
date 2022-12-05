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
import axios from "axios";

function ViewNominations(props) {
  const history = useHistory();
  const base_url = "http://localhost:8080/";
  //  const [nominee,setNominee]=useState([{ id: 1,roll_no:'200122', name: "Candidate1", desc: "PRESIDENT, STUDENTS GYMKHANA", manifesto_link: "https://drive.google.com/file/d/1oixPOrMZ9oFxudLUKQalpB1dZEnP_XTg/view?usp=sharing"},
  //                                    {id:2,roll_no:'200122',name:"Candidate2",desc:"GENERAL SECRETARY, GAMES AND SPORTS",manifesto_link:"https://drive.google.com/file/d/1AQvEHZ26kRiCbJS26g_auBEaYRgCXScR/view?usp=sharing"},
  //                                    {id:3,roll_no:'200122',name:"Candidate3",desc:"PRESIDENT, STUDENTS GYMKHANA",manifesto_link:"https://drive.google.com/file/d/1AQvEHZ26kRiCbJS26g_auBEaYRgCXScR/view?usp=sharing"},
  //                                    {id:4,roll_no:'200122',name:"Candidate4",desc:"GENERAL SECRETARY, SCIENCE AND TECHNOLOGY",manifesto_link:"https://drive.google.com/file/d/1AQvEHZ26kRiCbJS26g_auBEaYRgCXScR/view?usp=sharing"},
  // ]);
  const [nominee, setNominee] = useState([]);
  const [changed, setChanged] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
      async function fetchData() {
        if(changed == true){
          axios.defaults.withCredentials = true;
          await axios
            .get(base_url + "api/admin/viewAllNominations")
            .then((response) => {
              setNominee(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          setChanged(false);
        }
      }
      fetchData();
  }, [changed]); 

  const viewDetails = (event,id) => {
    history.push('/admin/info/'+id);
    event.preventDefault();
  };

  const accept = async(event, roll_no) => {
    event.preventDefault();

    axios.defaults.withCredentials = true;
    await axios
      .post(base_url + "api/admin/acceptNomination", {
        "roll_no": roll_no,
      })
      .then((response) => {
        setChanged(true);
        alert("nomination accepted");
        // setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reject = async (event, roll_no) => {
    event.preventDefault();

    axios.defaults.withCredentials = true;
    await axios
      .post(base_url + "api/admin/rejectNomination", {
        "roll_no": roll_no,
      })
      .then((response) => {
        setChanged(true);
        alert("Nomination deleted");
        // setShowModal(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const nomineeList = nominee.map((data) => {
    return (
      <tr>
        <th scope="row">
          <span className="mb-0 text-sm">
            {data.name}
          </span>
                       
        </th>
        <td>{data.post}</td>
        <td>
          <Badge color="" className="badge-dot mr-4">
            {data.roll_no}
          </Badge>
        </td>
        <td>
          <button type="button" class="btn btn-success" onClick={(e) => accept(e, data.roll_no)}>Accept</button>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <button type="button" class="btn btn-danger" onClick={(e) => reject(e, data.roll_no)}>Decline</button>
          </div>
        </td>
        <td className="text-right">
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn-icon-only text-light"
              role="button"
              size="sm"
              color=""
              onClick={(e) => e.preventDefault()}
            >
              <i className="fas fa-ellipsis-v" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem
                href="#pablo"
                onClick={(event) => viewDetails(event,data.roll_no )}
              >
                View Complete Details
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
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
                <h3 className="text-white mb-0">Nominations Filed</h3>
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
                  {nomineeList}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewNominations;
