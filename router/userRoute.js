const express = require('express');
const router = express.Router();
const { userController } = require('../controller/userController');
const user = new userController;

router.get('/', (req, res) => {
  res.send("Home Page for user")
});

router.get('/get', user.getUser)

module.exports = router;
