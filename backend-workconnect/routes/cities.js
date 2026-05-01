var express = require('express');
var router = express.Router();
var uplaod=require("./multer")
var pool=require("./pool");
const upload = require('./multer');
/* GET users listing. */
router.post('/add_new_city',uplaod.single('cityicon'), function(req, res, next) {
    console.log(req.body)
  pool.query("insert into cities(cityname,cityicon)values(?,?)",[req.body.cityname,req.file.filename],function(error,result){
     if(error)
     {  console.log("xxxxx",error)
        res.status(500).json({status:false,message:'Pls Contact to DBA...'})
     }
     else
     {
        res.status(200).json({status:true,message:'Record Submitted Successfully...'})
     }   

  }) 
    
});

router.get("/fetch_all_city",function(req,res){

   pool.query("select * from cities",function(error,result){
if(error)
     {  console.log("xxxxx",error)
        res.status(500).json({status:false,message:'Pls Contact to DBA...'})
     }
     else
     {
        res.status(200).json({status:true,data:result})
     }   

   })
})

router.post('/edit_city', function(req, res, next) {
    console.log(req.body)
  pool.query("update cities set cityname=? where cityid=?",[req.body.cityname,req.body.cityid],function(error,result){
     if(error)
     {  console.log("xxxxx",error)
        res.status(500).json({status:false,message:'Pls Contact to DBA...'})
     }
     else
     {
        res.status(200).json({status:true,message:'Record Editted Successfully...'})
     }   

  }) 
    
});



   router.post('/delete_city', function(req, res, next) {
    console.log(req.body)
  pool.query("delete from cities where cityid=?",[req.body.cityid],function(error,result){
     if(error)
     {  console.log("xxxxx",error)
        res.status(500).json({status:false,message:'Pls Contact to DBA...'})
     }
     else
     {
        res.status(200).json({status:true,message:'City Deleted Successfully...'})
     }   

  }) 
})

 router.post('/edit_city_icon',upload.single('cityicon') ,function(req, res, next) {
    console.log(req.body)
  pool.query("update  cities set cityicon=? where cityid=?",[req.file.filename,req.body.cityid],function(error,result){
     if(error)
     {  console.log("xxxxx",error)
        res.status(500).json({status:false,message:'Pls Contact to DBA...'})
     }
     else
     {
        res.status(200).json({status:true,message:'City Icon Updated Successfully...'})
     }   

  }) 
    
})


module.exports = router;
