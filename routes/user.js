const express = require("express");
const { getUsers, getUsersGeo, myAccount } = require("../controllers/users");
const router = express.Router();
router.route("/").get(getUsers);
router.route("/geography").get(getUsersGeo);

router.route("/my-account").get(myAccount);

module.exports = router;
