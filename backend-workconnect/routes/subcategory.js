var express = require('express');
var router = express.Router();

var pool = require("./pool");
const upload = require('./multer');
/* GET users listing. */

router.post('/add_new_subcategory', upload.single('icon'), function (req, res, next) {
   console.log(req.body)
   pool.query("insert into subcategory(categoryid,subcategoryname,icon)values(?,?,?)", [req.body.categoryid, req.body.subcategoryname, req.file.filename], function (error, result) {
      if (error) {
         console.log("xxxxx", error)
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, message: 'Record Submitted Successfully...' })
      }

   })

});

router.get("/fetch_all_subcategory_by_id", function (req, res) {
   console.log(req.query)
   pool.query("select * from subcategory where categoryid=?", [req.query.categoryid], function (error, result) {
      if (error) {
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, data: result })
      }

   })
})

router.get("/fetch_all_subcategory", function (req, res) {
   console.log(req.body)
   pool.query("select s. *,c.categoryname from subcategory s join category c on s.categoryid=c.categoryid", function (error, result) {
      if (error) {
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, data: result })
      }

   })
})

router.post('/edit_subcategory', function (req, res, next) {
   console.log(req.body)
   pool.query("update subcategory set categoryid=?, subcategoryname=? where subcategoryid=?", [req.body.categoryid, req.body.subcategoryname, req.body.subcategoryid], function (error, result) {
      if (error) {
         console.log("xxxxx", error)
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, message: 'Record Editted Successfully...' })
      }

   })

});





router.post('/delete_subcategory', function (req, res, next) {
   console.log(req.body)
   pool.query("delete from subcategory where subcategoryid=?", [req.body.subcategoryid], function (error, result) {
      if (error) {
         console.log("xxxxx", error)
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, message: 'subcategory Deleted Successfully...' })
      }

   })
})

router.post('/edit_subcategory_icon', upload.single('icon'), function (req, res, next) {
   console.log(req.body)
   pool.query("update  subcategory set icon=? where subcategoryid=?", [req.file.filename, req.body.subcategoryid], function (error, result) {
      if (error) {
         console.log("xxxxx", error)
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, message: 'subcategory Icon Updated Successfully...' })
      }

   })

})


module.exports = router;
