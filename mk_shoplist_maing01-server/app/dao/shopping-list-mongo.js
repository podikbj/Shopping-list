"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");

class ShoppingListMongo extends UuObjectDao {
    constructor(...args) {
        super(...args);
    }

    async createSchema() {
        await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
        await super.createIndex({ awid: 1, name: 1 }, { unique: true });
        await super.createIndex({ awid: 1, shoppingDate: 1 }, { unique: true });
    }

    async createShoppingList(uuObject) {
        return await super.insertOne(uuObject);
    }

    async getShoppingList(awid, id) {
        return await super.findOne({ awid, id });
    }

    async updateShoppingList(uuObject) {
        let filter = { id: uuObject.id, awid: uuObject.awid };
        return await super.findOneAndUpdate(filter, uuObject, "NONE");
    }

    async deleteShoppingList(awid, id) {
        await super.deleteOne({ awid, id });
    }

    async listShoppingList(awid, order, sortBy, pageInfo) {
        const filter = { awid };
        const sort = {
            [sortBy]: order === "asc" ? 1 : -1,
        };
        return await super.find(filter, pageInfo, sort);
    }

    async addItem(uuObject, itemId) {
        let filter = { id: uuObject.id, awid: uuObject.awid };
        return await super.findOneAndUpdate(
          filter,
          {
            $push: {
                itemList: new ObjectId(itemId),
            },
          },
          "NONE"
        );
    }

    async removeItem(uuObject, itemId) {
        let filter = { id: uuObject.id, awid: uuObject.awid };
        return await super.findOneAndUpdate(
          filter,
          {
            $pull: {
                itemList: new ObjectId(itemId),
            },
          },
          "NONE"
        );
     }

}

module.exports = ShoppingListMongo;