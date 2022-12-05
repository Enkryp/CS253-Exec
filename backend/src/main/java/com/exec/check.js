const fs = require('fs')
const lrs = require("lrs");

var da,db,dc;
fs.readFile('./a.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  da=data;
  fs.readFile('./b.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    db=data;
    fs.readFile('c.txt', 'utf8' , (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      dc=data;
      da = da.substring(1, da.length-1);
      // console.log(da);
      var publicKeyList = da.split(",");
      const KeyList = publicKeyList.map(element => {
        return element.trim();
      });
      // console.log(KeyList);
      console.log(lrs.verify(KeyList, db, dc));
    })
  })
})




