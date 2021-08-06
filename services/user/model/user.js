const { getDatabase } = require("../config");
const { ObjectId } = require("mongodb");
const { encode } = require("../helpers/bcrypt");
const collectionName = "user";

class User {
  static create(data) {
    data.password = encode(data.password);
    return getDatabase().collection(collectionName).insertOne(data);
  }

  static findOne(email) {
    return getDatabase().collection(collectionName).findOne({ email });
  }

  static findByPk(id) {
    return getDatabase()
      .collection(collectionName)
      .findOne({ _id: ObjectId(id) });
  }

  // static destroy(id) {
  //   return getDatabase()
  //     .collection(collectionName)
  //     .deleteOne({ _id: ObjectId(id) });
  // }
}

module.exports = User;
