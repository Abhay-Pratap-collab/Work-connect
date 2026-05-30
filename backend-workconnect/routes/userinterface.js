var express = require('express')
var pool = require('./pool')
var upload = require('./multer')
var router = express.Router()

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






module.exports = router