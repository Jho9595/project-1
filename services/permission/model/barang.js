const { getDatabase } = require("../config");
const { ObjectId } = require("mongodb");
const collectionName = "barang";

class Barang {
  static findById(id) {
    return getDatabase().collection(collectionName).findOne({ _id: ObjectId(id) });
  }
}

module.exports = Barang;
