import axios from 'axios';


export function applyForNominaton (roll_no, proposers, seconders, manifesto_link, post_link){
    var body ={ 
        "roll_no":roll_no,
        "manifesto":manifesto_link,
        "post":post_link
    }
    var reqParams = {
        "Proposers":proposers,
        "Seconders":seconders
    }
    axios
        .post("https://exec-backend.herokuapp.com/api/GBM/fileNomination/", body, reqParams)
        .then(res => {
            console.log(res);
            if(res.status === 200){
                alert("Candidature Filed Successfully!");
                window.location.href="/gbm/dashboard";
            }
        })
        .catch(error =>{
            console.log(error);
            alert("Candidature Application Failure!");
            window.location.reload();
        })
}

export function getCampaignRequests(){

    axios
        .get("https://exec-backend.herokuapp.com/api/GBM/campaignRequests/")
        .then(res => {
            console.log(res);
            if(res.status === 200){
                return res.body;
            }
        })
        .catch(error => {
            console.log(error);
            return {"Error":"Error occured while fetching data!"};
        })
}

export function acceptCampaignRequest(roll_no, name, email){
    var body = {
        "roll_no_candidate":roll_no,
        "name_candidate":name,
        "email_candidate":email
    };
    axios
        .post("https://exec-backend.herokuapp.com/api/GBM/acceptCampaignRequest/", body)
        .then(res => {
            console.log(res);
            if(res.status === 200){
                alert("Campaign Request Accepted! You are now a campaigner");
                window.location.reload();
            }
        })
        .catch(error => {
            console.log(error);
            alert(error.message);
        })
}

export function getProfile(){

    axios
        .get("https://exec-backend.herokuapp.com/api/GBM/profile/")
        .then(res => {
            console.log(res);
            if(res.status === 200){
                console.log(res);
                return res.body;
            }
        })
        .catch(error => {
            console.log(error);
            return null;
            
        })
}

export function getCandidatesList(){
    axios
        .get("https://exec-backend.herokuapp.com/api/")
}