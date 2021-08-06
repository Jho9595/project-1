const { getDatabase } = require("../config");
const { ObjectId } = require("mongodb");
const collectionName = "barang";

class Product {
  static findAll() {
    return getDatabase().collection(collectionName).find().toArray();
  }

  static findDocumentsCount() {
    return getDatabase().collection(collectionName).countDocuments()
  }

  static findById(id) {
    return getDatabase().collection(collectionName).findOne({ _id: ObjectId(id) });
  }

  static create(data) {
    return getDatabase().collection(collectionName).insertOne(data);
  }

  static update(id, data) {
    const filter = { _id: ObjectId(id) };
    return getDatabase().collection(collectionName).updateOne(filter, { $set: data });
  }

  static destroy(id) {
    return getDatabase().collection(collectionName).deleteOne({ _id: ObjectId(id) });
  }

    
}

module.exports = Product;
