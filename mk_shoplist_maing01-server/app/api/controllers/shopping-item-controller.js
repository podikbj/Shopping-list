"use strict";

const ShoppingItemAbl = require("../../abl/shopping-item-abl.js");

class ShoppingItemController {

  create(ucEnv) {
    return ShoppingItemAbl.create(ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(),ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  update(ucEnv) {
    return ShoppingItemAbl.update(ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  delete(ucEnv) {
    return ShoppingItemAbl.delete(ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  updateVisibility(ucEnv) {
    return ShoppingItemAbl.updateVisibility(ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }

}

module.exports = new ShoppingItemController();