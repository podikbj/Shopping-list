"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { Profiles, Schemas } = require("./constants");
const Warnings = require("../api/warnings/shopping-list-warning.js");
const Errors = require("../api/errors/shopping-list-error.js");
const ErrorsMain = require("../api/errors/shoplist-main-error.js");
const InstanceChecker = require("../component/instance-checker");

const DEFAULTS = {
  sortBy: "shoppingDate",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class ShoppingListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPPING_LIST);
    this.shoppingItemDao = DaoFactory.getDao(Schemas.SHOPPING_ITEM);
  }

  // CREATE
  async create(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingListCreateDtoInType", dtoIn);

    //HDS 1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.CreateShoppingList.createUnsupportedKeys.code,
      Errors.CreateShoppingList.InvalidDtoIn
    );

    //HDS 2
    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    //HDS 3
    // const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.EXECUTIVES) ||
    //   authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);

    // if (!isAuthorities) {
    //   // 3.1
    //   throw new Errors.CreateShoppingList.UserNotAuthorized({ uuAppErrorMap });
    // }

    const uuObject = {
      ...dtoIn,
    };

    //HDS 4
    uuObject.awid = awid;
    uuObject.visibility = true;
    uuObject.uuIdentity = session.getIdentity().getUuIdentity();
    uuObject.itemList = [];

    let shoppingList;
    //HDS 5
    try {
      shoppingList = await this.dao.createShoppingList(uuObject);
    } catch (e) {
      // 5.1
      if (e instanceof ObjectStoreError) {
        throw new Errors.CreateShoppingList.ShoppingListDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //HDS 6
    const dtoOut = {
      ...shoppingList,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  // GET
  async get(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingListGetDtoInType", dtoIn);

    //HDS 1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.GetShoppingList.createUnsupportedKeys.code,
      Errors.GetShoppingList.InvalidDtoIn
    );

    //HDS 2
    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    // HDS 3
    let shoppingList;
    try {
      shoppingList = await this.dao.getShoppingList(awid, dtoIn.id);
    } catch (e) {
      // 3.1
      if (e instanceof ObjectStoreError) {
        throw new Errors.GetShoppingList.ShoppingListDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if (!shoppingList) {
      // 3.2
      throw new Errors.GetShoppingList.ShoppingListDoesNotExist(uuAppErrorMap, { shoppingListId: dtoIn.id });
    }

    let items = await this.shoppingItemDao.getItemsByListId(awid, dtoIn.id);
    shoppingList.itemList = { ...items }.itemList;

    //HDS 4 
    const dtoOut = {
      ...shoppingList,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  //UPDATE
  async update(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingListUpdateDtoInType", dtoIn);

    //HDS 1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.UpdateShoppingList.createUnsupportedKeys.code,
      Errors.UpdateShoppingList.InvalidDtoIn
    );

    //HDS 2
    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    //HDS 3
    let shoppingList;
    try {
      shoppingList = await this.dao.getShoppingList(awid, dtoIn.id);
    } catch (e) {
      // 3.1
      if (e instanceof ObjectStoreError) {
        throw new Errors.UpdateShoppingList.ShoppingListDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if (!shoppingList) {
      // 3.2
      throw new Errors.UpdateShoppingList.ShoppingListDoesNotExist({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
    }

    // HDS 4
    // const uuIdentity = session.getIdentity().getUuIdentity();
    // const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.EXECUTIVES)
    //   || authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);
    // if (uuIdentity !== shoppingList.uuIdentity && !isAuthorities) {
    //   //4.1
    //   throw new Errors.UpdateShoppingList.UserNotAuthorized({ uuAppErrorMap });
    // }

    const uuObject = {
      ...dtoIn
    };

    // HDS 5
    uuObject.awid = awid;

    let updatedShoppingList;
    try {
      updatedShoppingList = await this.dao.updateShoppingList(uuObject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // 5.1
        throw new Errors.UpdateShoppingList.ShoppingListDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //HDS 6
    const dtoOut = {
      ...updatedShoppingList,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  //DELETE
  async delete(awid, dtoIn, session, authorizationResult) {

    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingListDeleteDtoInType", dtoIn);

    // HDS 1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.DeleteShoppingList.createUnsupportedKeys.code,
      Errors.DeleteShoppingList.InvalidDtoIn
    );

    //HDS 2
    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    //HDS 3
    let shoppingList;
    try {
      shoppingList = await this.dao.getShoppingList(awid, dtoIn.id);
    } catch (e) {
      // 3.1
      if (e instanceof ObjectStoreError) {
        throw new Errors.DeleteShoppingList.ShoppingListDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if (!shoppingList) {
      // 3.2
      throw new Errors.DeleteShoppingList.ShoppingListDoesNotExist({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
    }

    //HDS 4
    const uuIdentity = session.getIdentity().getUuIdentity();
    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.EXECUTIVES)
      || authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);
    if (uuIdentity !== shoppingList.uuIdentity && !isAuthorities) {
      // 4.1
      throw new Errors.DeleteShoppingList.UserNotAuthorized({ uuAppErrorMap });
    }

    //HDS 5
    await this.shoppingItemDao.deleteItemsByListId(awid, dtoIn.id);

    //HDS 6
    let dtoOut;
    try {
      dtoOut = await this.dao.deleteShoppingList(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //6.1
        throw new Errors.DeleteShoppingList.ShoppingListDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //HDS 7
    return { uuAppErrorMap };

  }

  //LIST
  async list(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingListListDtoInType", dtoIn);

    //HDS 1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.ListShoppingList.createUnsupportedKeys.code,
      Errors.ListShoppingList.InvalidDtoIn
    );

    //HDS 2
    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    //HDS 3
    let shoppingListList;
  
    try {
      shoppingListList = await this.dao.listShoppingList(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        //3.1
        throw new Errors.ListShoppingList.ShoppingListDaoListFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //HDS 4
    const dtoOut = {
      ...shoppingListList,

      uuAppErrorMap,
    };

    return dtoOut;
  }

  //ADD ITEM
  async addItem(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingListAddItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.AddItem.createUnsupportedKeys.code,
      Errors.AddItem.InvalidDtoIn
    );

    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    let shoppingList;
    try {
      shoppingList = await this.dao.getShoppingList(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.AddItem.ShoppingListDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    if (!shoppingList) {
      throw new Errors.AddItem.ShoppingListDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    let item;
    try {
      item = await this.shoppingItemDao.getShoppingItem(awid, dtoIn.itemId);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.AddItem.ShoppingItemDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    if (!item) {
      throw new Errors.AddItem.ShoppingItemDoesNotExist({ uuAppErrorMap }, { itemId: dtoIn.itemId });
    }

    const uuIdentity = session.getIdentity().getUuIdentity();
    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES)
      || authorizationResult.getAuthorizedProfiles().includes(Profiles.EXECUTIVES);
    if (uuIdentity !== item.uuIdentity && !isAuthorities) {
      throw new Errors.AddItem.UserNotAuthorized({ uuAppErrorMap });
    }
    if (uuIdentity !== shoppingList.uuIdentity && !isAuthorities) {
      throw new Errors.AddItem.UserNotAuthorized({ uuAppErrorMap });
    }

    const uuObject = {
      ...dtoIn
    };

    uuObject.awid = awid;
    delete uuObject.itemId;
    console.log(uuObject);

    let shoppingListWithAddedItem;

    try {
      shoppingListWithAddedItem = await this.dao.addItem(uuObject, dtoIn.itemId);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.AddItem.ShoppingListDaoAddItemFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...shoppingListWithAddedItem,
      uuAppErrorMap,
    };

    return dtoOut;

  }

  //REMOVE ITEM
  async removeItem(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingListRemoveItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.RemoveItem.createUnsupportedKeys.code,
      Errors.RemoveItem.InvalidDtoIn
    );

    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    let shoppingList;
    try {
      shoppingList = await this.dao.getShoppingList(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.RemoveItem.ShoppingListDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    if (!shoppingList) {
      throw new Errors.RemoveItem.ShoppingListDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    let item;
    try {
      item = await this.shoppingItemDao.getShoppingItem(awid, dtoIn.itemId);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.RemoveItem.ShoppingItemDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    if (!item) {
      throw new Errors.RemoveItem.ShoppingItemDoesNotExist({ uuAppErrorMap }, { itemId: dtoIn.itemId });
    }

    const uuIdentity = session.getIdentity().getUuIdentity();
    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES)
      || authorizationResult.getAuthorizedProfiles().includes(Profiles.EXECUTIVES);
    if (uuIdentity !== item.uuIdentity && !isAuthorities) {
      throw new Errors.RemoveItem.UserNotAuthorized({ uuAppErrorMap });
    }
    if (uuIdentity !== shoppingList.uuIdentity && !isAuthorities) {
      throw new Errors.RemoveItem.UserNotAuthorized({ uuAppErrorMap });
    }

    const uuObject = {
      ...dtoIn
    };

    uuObject.awid = awid;
    delete uuObject.itemId;
    console.log(uuObject);

    let shoppingListRemovedItem;

    try {
      shoppingListRemovedItem = await this.dao.removeItem(uuObject, dtoIn.itemId);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.RemoveItem.ShoppingListDaoRemoveItemFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...shoppingListRemovedItem,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  //GET ITEMS BY LIST ID
  async getItemsByListId(awid, dtoIn) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("getItemsByListIdDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.GetItemsByListId.createUnsupportedKeys.code,
      Errors.GetItemsByListId.InvalidDtoIn);

    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    let shoppingList;
    try {
      shoppingList = await this.dao.getShoppingList(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.GetItemsByListId.ShoppingListDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if (!shoppingList) {
      throw new Errors.GetItemsByListId.ShoppingListDoesNotExist(uuAppErrorMap, { shoppingListId: dtoIn.id });
    }

    let items;
    try {
      items = await this.shoppingItemDao.getItemsByListId(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.GetItemsByListId.GetItemsByListIdDaoFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...items.itemList,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  //DELETE ITEMS BY LIST ID
  async deleteItemsByListId(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("deleteItemsByListIdDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.DeleteItemsByListId.createUnsupportedKeys.code,
      Errors.DeleteItemsByListId.InvalidDtoIn);

    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    let shoppingList;
    try {
      shoppingList = await this.dao.getShoppingList(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.DeleteItemsByListId.ShoppingListDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if (!shoppingList) {
      throw new Errors.DeleteItemsByListId.ShoppingListDoesNotExist(uuAppErrorMap, { shoppingListId: dtoIn.id });
    }

    const uuIdentity = session.getIdentity().getUuIdentity();
    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.EXECUTIVES)
      || authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);
    if (uuIdentity !== shoppingList.uuIdentity && !isAuthorities) {
      throw new Errors.DeleteShoppingList.UserNotAuthorized({ uuAppErrorMap });
    }

    let items;
    try {
      items = await this.shoppingItemDao.deleteItemsByListId(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.DeleteItemsByListId.DeleteItemsByListIdDaoFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      uuAppErrorMap,
    };

    return dtoOut;
  }

  //UPDATE SHOPPING LITS VISIBILITY
  async updateVisibility(awid, dtoIn, authorizationResult) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingListUpdateVisibilityDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.UpdateShoppingListVisibility.createUnsupportedKeys.code,
      Errors.UpdateShoppingListVisibility.InvalidDtoIn);

    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );
    let shoppingList;

    try {
      shoppingList = await this.dao.getShoppingList(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.UpdateShoppingListVisibility.ShoppingListDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if (!shoppingList) {
      throw new Errors.UpdateShoppingListVisibility.ShoppingListDoesNotExist({ uuAppErrorMap }, { shoppingItemId: dtoIn.id });
    }

    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);

    if (!isAuthorities) {
      throw new Errors.UpdateShoppingListVisibility.UserNotAuthorized({ uuAppErrorMap });
    }

    const toUpdate = { ...dtoIn };

    toUpdate.awid = awid;
    toUpdate.visibility = !shoppingList.visibility;

    let updatedShoppingList;
    try {
      updatedShoppingList = await this.dao.updateShoppingList(toUpdate);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.UpdateShoppingListVisibility.ShoppingListDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...updatedShoppingList,
      uuAppErrorMap,
    };

    return dtoOut;
  }

}

module.exports = new ShoppingListAbl();