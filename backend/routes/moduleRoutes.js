



const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");

router.get("/", moduleController.getAllModules);
router.post("/", moduleController.createModule);
router.put("/:id", moduleController.updateModule);
router.delete("/:id", moduleController.deleteModule);

// Temple-wise enabled modules
router.get("/temple/:templeId", moduleController.getEnabledModulesByTemple);


module.exports = router;
