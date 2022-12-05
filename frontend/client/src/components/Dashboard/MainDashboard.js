// reactstrap components
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Row,
  Modal,
  Container
  
} from "reactstrap";
import { Link,useHistory } from 'react-router-dom';

function MainDashboard(){
  const history = useHistory();
  const [notificationModal,setNotificationModal]=useState({content:{},visible:false});
  const [candidates, setCandidates] = useState([]);
  const base_url = "http://localhost:8080/";
  const style = {
    width: "22rem",
    height: "32rem"
  };

  useEffect(() => {
    async function fetchData() {
      axios.defaults.withCredentials = true;
      await axios
        .get(base_url + "viewCandidates")
        .then((response) => {
          setCandidates(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []); 

  function toggleModal(value,item) {
    console.log("hello");
      console.log(item);
      let info={content:item,visible:value}
      console.log(info);
      setNotificationModal(info)
  };

  function cardClick(id) {
    history.push('/info/'+id);
  }

  let contents;

  function Split(){

    let copy=candidates.slice();

    let arr=[],size=4;

    while(copy.length>0){
      arr.push(copy.splice(0,size));
    }

    contents=arr.map((data,i)=>{
      let cols= data.map((item,j)=>{
        return(
          <>  
            <Col lg="6" xl="3">            
              <Card style={style} className="card-stats mb-3 mb-xl-0">
                <CardImg
                  alt="..."
                  src={require("./photo.png").default}
                  top
                ></CardImg>
                <CardBody>
              <a style={{ cursor: 'pointer' }} onClick={()=>toggleModal(true,item)}>
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-uppercase text-muted mb-0"
                  >
                    {item.name}
                  </CardTitle>
                  <span className="text-nowrap">
                    {item.post}
                  </span>
                </div>
                <Col className="col-auto">
                  <img
                    alt=""
                    className="navbar-brand-img"
                    src=""
                  /> 
                </Col>
              </Row>
              </a>
              <p className="mt-3 mb-0 text-muted text-sm">
              <span className="text-Hex"><Link onClick={() => cardClick(item.roll_no)}><b><Button color="info">View Candidate Details</Button></b></Link></span>
              </p>
            </CardBody>
              </Card>
              
        </Col>
        </>
        );
        })

      return(
        <>
        <Row>  
           {cols}
        </Row><br/><br/>
        </>
      );
    })

    return(
      <>
      {contents}
      </>
    )
  }
   
  return (
    <>
       <Modal
        className="modal-dialog-centered modal-danger"
        contentClassName="bg-gradient-danger"
        isOpen={notificationModal.visible}
        toggle={() => toggleModal(notificationModal)}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-notification">
            Candidate Details
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
              <i className="ni ni-bell-55 ni-3x" />
              <h4 className="heading mt-4">{notificationModal.content.name}</h4>
              <p>
              {notificationModal.content.desc}
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

      <div className="header bg-gradient-info pb-8 pt-1 pt-md-8" style={{ height: "100vh", overflow: "scroll"}}>
        <Container fluid  >
          <div className="header-body">
            <Split />
          </div>
        </Container>
      </div>
    </>
  );
}

export default MainDashboard;
