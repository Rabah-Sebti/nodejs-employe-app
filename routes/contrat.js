const express = require("express");
const router = express.Router();
const {
  createContrat,
  deleteContrat,
  getAllContrats,
  updateContrat,
  getContrat,
} = require("../controllers/contrat");
router.route("/").post(createContrat).get(getAllContrats);
router.route("/:id").get(getContrat).put(updateContrat).delete(deleteContrat);
module.exports = router;
