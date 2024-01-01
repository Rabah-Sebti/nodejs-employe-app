const express = require("express");
const router = express.Router();
const {
  createSalarie,
  deleteSalarie,
  getAllSalaries,
  updateSalarie,
  getSalarie,
  getSalariesGeo,
} = require("../controllers/salaries");
router.route("/").post(createSalarie).get(getAllSalaries);
router.route("/geography").get(getSalariesGeo);

router.route("/:id").get(getSalarie).put(updateSalarie).delete(deleteSalarie);
module.exports = router;
