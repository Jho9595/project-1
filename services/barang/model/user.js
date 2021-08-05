const { getDatabase } = require("../config");
const { ObjectId } = require("mongodb");
const collectionName = "user";

class User {
  static findByPk(id) {
    return getDatabase().collection(collectionName).findOne({ _id: ObjectId(id) });
  }
}

module.exports = User;
