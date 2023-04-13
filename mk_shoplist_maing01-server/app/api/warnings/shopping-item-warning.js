"use strict";

const Errors = require("../errors/shopping-item-error.js");

const CreateShoppingItem = {
  createUnsupportedKeys: {
    code: `${Errors.CreateShoppingItem.UC_CODE}unsupportedKeys`
  }
};
const UpdateShoppingItem = {
  createUnsupportedKeys: {
    code: `${Errors.UpdateShoppingItem.UC_CODE}unsupportedKeys`
  }
};

const DeleteShoppingItem = {
  createUnsupportedKeys: {
    code: `${Errors.DeleteShoppingItem.UC_CODE}unsupportedKeys`
  }
};

const UpdateShoppingItemVisibility = {
  createUnsupportedKeys: {
    code: `${Errors.UpdateShoppingItemVisibility.UC_CODE}unsupportedKeys`
  }
};

module.exports = {
  CreateShoppingItem, UpdateShoppingItem, DeleteShoppingItem, UpdateShoppingItemVisibility
};