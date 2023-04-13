"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");

class ShoppingItemMongo extends UuObjectDao {
    constructor(...args) {
        super(...args);
    }

    async createSchema() {
        await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
        // await super.createIndex({ awid: 1, name: 1 }, { unique: true });
    }

    async createShoppingItem(uuObject) {
        uuObject.shoppingListId = new ObjectId(uuObject.shoppingListId);
        return await super.insertOne(uuObject);
    }

    async getShoppingItem(awid, id) {
        return await super.findOne({ id, awid });
    }

    async updateShoppingItem(uuObject) {
        const filter = {
            awid: uuObject.awid,
            id: uuObject.id
        }
        return await super.findOneAndUpdate(filter, uuObject, "NONE");
    }

    async deleteShoppingItem(awid, id) {
        await super.deleteOne({ awid, id });
    }

    async getItemsByListId(awid, id) {
        const filter = {
            awid: awid,
            shoppingListId: new ObjectId(id)
        }
        return await super.find(filter);
    }

    async deleteItemsByListId(awid, id) {
        const filter = {
            awid: awid,
            shoppingListId: new ObjectId(id)
        }
        return await super.deleteMany(filter);
    }
}

module.exports = ShoppingItemMongo;