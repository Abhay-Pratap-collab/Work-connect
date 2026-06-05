var express = require('express')
var pool = require('./pool')
var upload = require('./multer')

var router = express.Router()

router.post('/add_new_price', upload.single('picture'), function (req, res, next) {
   console.log(req.body)
   var body = [req.body.categoryid, req.body.subcategoryid, req.body.typeosfservices, req.body.amount, req.body.offer, req.body.time_services, req.body.discription, req.file.filename]
   pool.query('insert into pricing(categoryid,subcategoryid,typesofservices,amount,offer,time_services,discription,picture)values(?,?,?,?,?,?,?,?)', body, function (error, result) {

      if (error) {
         console.log(error)
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, message: "success" })
      }

   })

})

// router.get("/fetch_all_prices", function (req, res) {

//    pool.query("select * from pricing", function (error, result) {
//       if (error) {
//          console.log("xxxxx", error)
//          res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
//       }
//       else {
//          res.status(200).json({ status: true, data: result })
//       }

//    })
// })
//  Isko copy karke apne price router ke fetch_all_price mein daal dein
router.get("/fetch_all_price", function (req, res) {
   pool.query(
      "select p.*, c.categoryname, s.subcategoryname from pricing p join category c on p.categoryid = c.categoryid join subcategory s on p.subcategoryid = s.subcategoryid",
      function (error, result) {
         if (error) {
            console.log(error);
            res.status(500).json({ status: false, message: 'Pls Contact to DBA...' });
         } else {
            res.status(200).json({ status: true, data: result });
         }
      }
   );
});

router.post('/delete_price', function (req, res, next) {
   console.log(req.body)
   pool.query("delete from pricing where priceid=?", [req.body.priceid], function (error, result) {
      if (error) {
         console.log("xxxxx", error)
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, message: 'City Deleted Successfully...' })
      }

   })
})
module.exports = router