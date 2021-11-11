const { createUser, getAllUsers, getUserById, updateUser, deleteuser } = require('./user.controller')
const router = require('express').Router()

router.post('/', createUser);
router.get('/', getAllUsers);
router.get("/:id", getUserById);
router.patch("/update", updateUser);
router.delete("/", deleteuser);

module.exports = router;