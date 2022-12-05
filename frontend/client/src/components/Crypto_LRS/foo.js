var CryptoJS = require("crypto-js");



// async function loadKeys() {
//     const response = await fetch('/api/report/keys/public');
    

//     const keys = await response.json();
//     return keys['publicKeys'];
//   }


// async function postReport(data) {
//     const response = await fetch('/api/report/keys/public');
    

//     const keys = await response.json();
//     return keys['publicKeys'];
//   

// fetch("/api/report/post/", {
//     method: "POST",
//     headers: {'Content-Type': 'application/json'}, 
//     body: JSON.stringify(data)
//   }).then(res => {
//     console.log("Request complete! response:", res);
//   });
  
// }

//   async function getPriv() {
//     let pass = prompt("Please enter your password", "Password");
//     let roll= prompt("Please enter your roll number", "Roll Number");
//     const response = await fetch('/api/report/keys/priv/?roll='+ roll);
//     const keys = await response.json();
//     var bytes  = CryptoJS.AES.decrypt(keys[priv], pass);
//     var decryptedPriv = bytes.toString(CryptoJS.enc.Utf8);
//     keys['priv']=decryptedPriv;
//     return keys;
//   }
  
  
var lrs = require("lrs");


// General Type to be used
// var publicKeyList=[];
// var message='';
// var secretKey={'publicKey':'', 'privateKey':''};



var secretKey=lrs.gen();
var publicKeyList=[lrs.gen().publicKey, lrs.gen().publicKey, lrs.gen().publicKey, secretKey.publicKey];
// var tempSecret=getPriv();
secretKey['pri']
// var secretKey='{"publicKey":"'+tempSecret['publicKey']+'","privateKey":"'+tempSecret['priv']+'"}';
// secretKey= JSON.parse(secretKey);
// var publicKeyList=loadKeys();
var message='11';

var signed = lrs.sign(publicKeyList, secretKey, message);

var data = '{"message":"'+message+'","signed":"'+signed+'"}';
data= JSON.parse(data);
// postReport(data);
console.log(publicKeyList,message,signed, lrs.verify(publicKeyList, signed, message));
