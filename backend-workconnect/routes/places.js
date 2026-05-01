var express = require('express')
var router = express.Router()
var upload = require("./multer")
var pool = require("./pool")
router.post('/add_new_place', function (req, res) {
    pool.query("insert into places(cityid,placename,pincode)values(?,?,?)", [req.body.cityid, req.body.placename,req.body.pincode], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: "pls contact to DBA" })
        }
        else {
            res.status(200).json({ status: true, message: "record submitted successfully" })
        }
    })
})


router.get('/fetch_all_place', function (req, res) {
    const query = "SELECT p.*, c.cityname FROM places p JOIN cities c ON p.cityid = c.cityid";
    pool.query(query, function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: "pls contact to DSA....." })
        }
        else {
            res.status(200).json({ status: true, data: result })
        }
    })
})


router.post('/edit_place', function (req, res, next) {
    console.log(req.body)
    pool.query("update places set cityid=? ,placename=?, pincode=? where placeid=?", [req.body.cityid, req.body.placename,req.body.pincode,req.body.placeid], function (error, result) {
        if (error) {
            console.log("xxxxx", error)
            res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
        }
        else {
            res.status(200).json({ status: true, message: 'Record Editted Successfully...' })
        }

    })

});

router.post('/delete_place', function (req, res, next) {
    console.log(req.body)
    pool.query("delete from places where placeid=?", [req.body.placeid], function (error, result) {
        if (error) {
            console.log("xxxxx", error)
            res.status(500).json({ status: false, message: 'Pls Contact to DBA...' })
        }
        else {
            res.status(200).json({ status: true, message: 'City Deleted Successfully...' })
        }

    })

})
module.exports = router;
