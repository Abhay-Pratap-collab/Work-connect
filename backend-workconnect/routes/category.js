var express = require('express')
var pool = require('./pool')
var upload = require('./multer')
var router = express.Router()
router.post('/add_new_category', upload.single('icon'), function (req, res, next) {
   console.log(req.body)
   pool.query('insert into category(categoryname,icon)values(?,?)', [req.body.categoryname, req.file.filename], function (error, result) {

      if (error) {
         console.log(error)
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, message: "success" })
      }

   })

})

router.get("/fetch_all_category", function (req, res) {

   pool.query("select * from category", function (error, result) {
      if (error) {
         console.log("xxxxx", error)
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, data: result })
      }

   })
})
router.post('/edit_category', function (req, res, next) {
   console.log(req.body)
   pool.query("update category set categoryname=? where categoryid=?", [req.body.categoryname, req.body.categoryid], function (error, result) {
      if (error) {
         console.log("xxxxx", error)
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, message: 'Record Editted Successfully...' })
      }

   })

});



router.post('/delete_category', function (req, res, next) {
   console.log(req.body)
   pool.query("delete from category where categoryid=?", [req.body.categoryid], function (error, result) {
      if (error) {
         console.log("xxxxx", error)
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, message: 'City Deleted Successfully...' })
      }

   })
})


router.post('/edit_category_icon', upload.single('icon'), function (req, res, next) {
   console.log(req.body)
   pool.query("update  category set icon=? where categoryid=?", [req.file.filename, req.body.categoryid], function (error, result) {
      if (error) {
         console.log("xxxxx", error)
         res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
      }
      else {
         res.status(200).json({ status: true, message: 'City Icon Updated Successfully...' })
      }

   })

})
module.exports = router