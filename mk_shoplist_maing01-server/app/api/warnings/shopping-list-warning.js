"use strict";

const Errors = require("../errors/shopping-list-error.js");

const CreateShoppingList = {
  createUnsupportedKeys: {
    code: `${Errors.CreateShoppingList.UC_CODE}unsupportedKeys`
  }
};

const GetShoppingList = {
  createUnsupportedKeys: {
    code: `${Errors.GetShoppingList.UC_CODE}unsupportedKeys`
  }
};

const UpdateShoppingList = {
  createUnsupportedKeys: {
    code: `${Errors.UpdateShoppingList.UC_CODE}unsupportedKeys`
  }
};

const DeleteShoppingList = {
  createUnsupportedKeys: {
    code: `${Errors.DeleteShoppingList.UC_CODE}unsupportedKeys`
  }
};

const ListShoppingList = {
  createUnsupportedKeys: {
    code: `${Errors.ListShoppingList.UC_CODE}unsupportedKeys`
  }
};

const GetItemsByListId = {
  createUnsupportedKeys: {
    code: `${Errors.GetItemsByListId.UC_CODE}unsupportedKeys`
  }
};

const DeleteItemsByListId = {
  createUnsupportedKeys: {
    code: `${Errors.DeleteItemsByListId.UC_CODE}unsupportedKeys`
  }
};

const AddItem = {
  createUnsupportedKeys: {
    code: `${Errors.AddItem.UC_CODE}unsupportedKeys`
  }
};

const RemoveItem = {
  createUnsupportedKeys: {
    code: `${Errors.RemoveItem.UC_CODE}unsupportedKeys`
  }
};

const UpdateShoppingListVisibility = {
  createUnsupportedKeys: {
    code: `${Errors.UpdateShoppingListVisibility.UC_CODE}unsupportedKeys`
  }
};


module.exports = {
  CreateShoppingList,
  UpdateShoppingList,
  GetShoppingList,
  DeleteShoppingList,
  ListShoppingList,
  GetItemsByListId,
  DeleteItemsByListId,
  AddItem,
  RemoveItem,
  UpdateShoppingListVisibility
};