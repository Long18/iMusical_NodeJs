const { verifyToken, verifyTokenAndUserAuthorization} = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();

//ADD USERS
router.post("/",userController.addUser);

//GET ALL USERS
router.get("/",verifyToken,userController.getAllUsers);

//GET AN USER
router.get("/:id",userController.getAnUser);

//UPDATE AN USER
router.put("/:id",userController.updateAnUser);

//Delete AN USER
router.delete("/:id",verifyTokenAndUserAuthorization,userController.deleteAnUser);

//Cũng là export ra để xài luôn nha, ở phía index.js đó
module.exports = router;