var express = require('express');
var router = express.Router();
var pool = require('./pool')


/* GET users listing. */

router.post('/check_user_mobileno', function(req, res, next) {
pool.query("select * from users where phone=?",[req.body.phone],function(error,result)
{
  if(error)
  {
    res.json({message:'error',status:false})
  }
  else{
    if(result.length==1)
    {

      res.json({message:'success',data:result[0],status:true})
    }
    else{
          res.json({message:'fail',status:false})

      
    }
  }

}

)
});
module.exports = router;
