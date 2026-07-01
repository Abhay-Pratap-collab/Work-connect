const express = require('express');
const router = express.Router();

const pool = require('./pool');


router.post('/chk_admin_password', (req, res, next) => {
    pool.query("select * from admins where (emailid=? or mobileno=? ) and password=?", [req.body.emailid, req.body.emailid, req.body.password], function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: "Please contact to Database Administrator..." })
        }
        else {
            if (result.length == 1) {
                res.status(200).json({ status: true, message: "Successful" })
            }
            else {
                res.status(200).json({ status: false, message: "Invalid Email/Mobile Number/Password..." })
            }
        }
    })
})


module.exports = router