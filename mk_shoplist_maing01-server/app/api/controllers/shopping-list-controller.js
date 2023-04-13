"use strict";

const ShoppingListAbl = require("../../abl/shopping-list-abl.js");

class ShoppingListController {

  create(ucEnv) {
    return ShoppingListAbl.create(ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  get(ucEnv) {
    return ShoppingListAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),
      ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  update(ucEnv) {
    return ShoppingListAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),
      ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  delete(ucEnv) {
    return ShoppingListAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),
      ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  list(ucEnv) {
    return ShoppingListAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),
      ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  addItem(ucEnv) {
    return ShoppingListAbl.addItem(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),
      ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  removeItem(ucEnv) {
    return ShoppingListAbl.removeItem(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),
      ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  getItemsByListId(ucEnv) {
    return ShoppingListAbl.getItemsByListId(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),
      ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  deleteItemsByListId(ucEnv) {
    return ShoppingListAbl.deleteItemsByListId(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),
      ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  updateVisibility(ucEnv) {
    return ShoppingListAbl.updateVisibility(ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }

}

module.exports = new ShoppingListController();