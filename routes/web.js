const express = require('express');
const router = express.Router();

router.get(
    "/", (req, res) => {
        return res.json({
            data: "Woohooo"
        });
    }
);

module.exports = router;
