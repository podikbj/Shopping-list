"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const Warnings = require("../api/warnings/shopping-item-warning.js");
const { Profiles, Schemas } = require("./constants");

const Errors = require("../api/errors/shopping-item-error.js");
const InstanceChecker = require("../component/instance-checker");
const ErrorsMain = require("../api/errors/shoplist-main-error.js");

class ShoppingItemAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPPING_ITEM);
    this.shoppingListDao = DaoFactory.getDao(Schemas.SHOPPING_LIST);
  }

  //CREATE 
  async create(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingItemCreateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.CreateShoppingItem.createUnsupportedKeys.code,
      Errors.CreateShoppingItem.InvalidDtoIn
    );

    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.EXECUTIVES) ||
      authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);

    if (!isAuthorities) {
      throw new Errors.CreateShoppingItem.UserNotAuthorized({ uuAppErrorMap });
    }

    const uuObject = {
      ...dtoIn,
    };

    uuObject.awid = awid;
    uuObject.visibility = true;
    uuObject.uuIdentity = session.getIdentity().getUuIdentity();

    let shoppingItem;

    try {
      shoppingItem = await this.dao.createShoppingItem(uuObject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.CreateShoppingItem.ShoppingItemDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...shoppingItem,
      uuAppErrorMap,
    };

    return dtoOut;

  }

  //UPDATE
  async update(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingItemUpdateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.UpdateShoppingItem.createUnsupportedKeys.code,
      Errors.UpdateShoppingItem.InvalidDtoIn);

    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    let shoppingItem;
    try {
      shoppingItem = await this.dao.getShoppingItem(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.UpdateShoppingItem.ShoppingItemDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if (!shoppingItem) {
      throw new Errors.UpdateShoppingItem.ShoppingItemDoesNotExist({ uuAppErrorMap }, { shoppingItemId: dtoIn.id });
    }

    const uuIdentity = session.getIdentity().getUuIdentity();
    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.EXECUTIVES) ||
      authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);

    if (uuIdentity !== shoppingItem.uuIdentity && !isAuthorities) {
      throw new Errors.UpdateShoppingItem.UserNotAuthorized({ uuAppErrorMap });
    }

    const uuObject = {
      ...dtoIn
    };

    uuObject.awid = awid;
    let updatedShoppingItem;
    try {
      updatedShoppingItem = await this.dao.updateShoppingItem(uuObject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.UpdateShoppingItem.ShoppingItemDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...updatedShoppingItem,
      uuAppErrorMap,
    };

    return dtoOut;

  }

  //DELETE
  async delete(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingItemDeleteDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.DeleteShoppingItem.createUnsupportedKeys.code,
      Errors.DeleteShoppingItem.InvalidDtoIn);

    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );

    let shoppingItem;

    try {
      shoppingItem = await this.dao.getShoppingItem(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.DeleteShoppingItem.ShoppingItemDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if (!shoppingItem) {
      throw new Errors.DeleteShoppingItem.ShoppingItemDoesNotExist({ uuAppErrorMap }, { shoppingItemId: dtoIn.id });
    }

    const uuIdentity = session.getIdentity().getUuIdentity();
    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.EXECUTIVES) ||
      authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);
    if (uuIdentity !== shoppingItem.uuIdentity && !isAuthorities) {
      throw new Errors.DeleteShoppingItem.UserNotAuthorized({ uuAppErrorMap });
    }

    let dtoOut;
    try {
      dtoOut = await this.dao.deleteShoppingItem(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.DeleteShoppingItem.ShoppingItemDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    return { uuAppErrorMap };

  }

  //UPDATE ITEM VISIBILITY
  async updateVisibility(awid, dtoIn, authorizationResult) {
    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingItemVisibilityUpdateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.UpdateShoppingItemVisibility.createUnsupportedKeys.code,
      Errors.UpdateShoppingItemVisibility.InvalidDtoIn);

    // await InstanceChecker.ensureInstance(
    //   awid,
    //   ErrorsMain.Load,
    //   uuAppErrorMap
    // );
    let shoppingItem;

    try {
      shoppingItem = await this.dao.getShoppingItem(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.UpdateShoppingItemVisibility.ShoppingItemDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if (!shoppingItem) {
      throw new Errors.UpdateShoppingItemVisibility.ShoppingItemDoesNotExist({ uuAppErrorMap }, { shoppingItemId: dtoIn.id });
    }

    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);

    if (!isAuthorities) {
      throw new Errors.UpdateShoppingItemVisibility.UserNotAuthorized({ uuAppErrorMap });
    }

    const toUpdate = { ...dtoIn };

    toUpdate.awid = awid;
    toUpdate.visibility = !shoppingItem.visibility;

    let updatedShoppingItem;
    try {
      updatedShoppingItem = await this.dao.updateShoppingItem(toUpdate);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.UpdateShoppingItemVisibility.ShoppingItemDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    const dtoOut = {
      ...updatedShoppingItem,
      uuAppErrorMap,
    };

    return dtoOut;
  }
}

module.exports = new ShoppingItemAbl();