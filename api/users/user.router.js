const { createUser, getAllUsers, getUserById, updateUser, deleteuser, getUserByEmail } = require('./user.controller')
const router = require('express').Router()
const { checkToken } = require('../../auth/token_validation')

router.post('/', checkToken, createUser);
router.get('/', checkToken, getAllUsers);
router.get("/:id",checkToken, getUserById);
router.patch("/update",checkToken, updateUser);
router.delete("/",checkToken, deleteuser);
router.post("/login", getUserByEmail);

module.exports = router;