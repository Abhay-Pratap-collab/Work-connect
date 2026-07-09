var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.post("/", function (req, res) {
    pool.query(
        "SELECT * FROM users WHERE phone=?",
        [req.body.phone],
        function (error, result) {

            if (error) {
                return res.json({
                    status: false,
                    message: "Database Error"
                });
            }

            if (result.length > 0) {
                return res.json({
                    status: true,
                    message: "User Found",
                    data: result[0]
                });
            }

            return res.json({
                status: false,
                message: "User Not Found"
            });
        }
    );
});

module.exports = router;