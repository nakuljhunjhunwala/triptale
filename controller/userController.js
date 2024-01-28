const userService = require('../model/users')
class userController {
  async getUser(req, res) {
    let detail = [];
    try {
      detail = await userService.find({});
    } catch (error) {
      console.log(error);
    }
    res.send(detail)
  }
}

module.exports = {
  userController
}
