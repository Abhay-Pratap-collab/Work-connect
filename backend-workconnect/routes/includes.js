var express = require('express')
var router = express.Router()
var pool = require('./pool')
router.post("/new_include", function (req, res) {

  console.log(req.body)
  const body = req.body
  pool.query("insert into includes (categoryid,subcategoryid,includes,excludes) values(?,?,?,?) ", [body.categoryid, body.subcategoryid, body.includes, body.excludes], function (error, result) {
    if (error) {
      console.log(body)
      res.status(500).json({ status: false, message: "please contcat DBA " })
    }
    else {
      res.status(200).json({ status: true, message: "corrct" })
    }
  })
})
router.get("/fetch_all_includes", (req, res) => {
  // We specify S.subcategoryname and C.categoryname explicitly 
  // to prevent them from overwriting the 'id' or 'name' columns in I.*
  const query = "SELECT I.*, S.subcategoryname, C.categoryname FROM includes I JOIN subcategory S ON I.subcategoryid = S.subcategoryid JOIN category C ON S.categoryid = C.categoryid";

  pool.query(query, (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).json({ status: false, message: "Contact to DBA", error });
    } else {
      res.status(200).json({ status: true, message: "Data Get Successfully", data: result });
    }
  });
});

router.post("/edit_includes", (req, res) => {
  console.log(req.body)
  pool.query("update  includes set categoryid=?,subcategoryid=?,includes=?,excludes=? where includeid=? ", [req.body.categoryid, req.body.subcategoryid, req.body.includes, req.body.excludes, req.body.includeid], (error, result) => {
    if (error) {
      res.status(500).json({ status: false, message: "Contact to DBA", error })
      console.log("Error:", error)
    }
    else {
      res.status(200).json({ status: true, message: "Edit Sucessfully" })
    }
  })
})



router.post("/delete_includes", (req, res) => {
  console.log(req.body)
  pool.query("delete from includes where includeid=?", [req.body.includeid], (error, result) => {
    if (error) {
      res.status(500).json({ status: false, message: "Contact to DBA", error })
      console.log("Error:", error)
    }
    else {
      res.status(200).json({ status: true, message: "Delete Sucessfully" })
    }
  })
})
module.exports = router