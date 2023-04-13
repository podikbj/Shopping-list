"use strict";
// const { Validator } = require("uu_appg01_server").Validation;
// const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
// const { ValidationHelper } = require("uu_appg01_server").AppServer;
// const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
// const { UriBuilder } = require("uu_appg01_server").Uri;
// const { LoggerFactory } = require("uu_appg01_server").Logging;
// const { AppClient } = require("uu_appg01_server");
// const Errors = require("../api/errors/shoplist-main-error.js");

const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { Profile } = require("uu_appg01_server").Workspace;
const Errors = require("../api/errors/shoplist-main-error");
const { Schemas, Profiles } = require("./constants");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`,
  },
};

const DEFAULT_NAME = "mkShoplist";

// const logger = LoggerFactory.get("ShoplistMainAbl");

class ShoplistMainAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPLIST_MAIN);
    this.shoppingListDao = DaoFactory.getDao(Schemas.SHOPPING_LIST);
  }

  async init(uri, dtoIn) {
    const awid = uri.getAwid();
    let uuAppErrorMap = {};

    // hds 1
    const validationResult = this.validator.validate("initDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );
    // 1.4
    dtoIn.name = dtoIn.name || DEFAULT_NAME;

    // hds 2
    const promises = Object.values(Schemas).map(async (schema) => DaoFactory.getDao(schema).createSchema());
    try {
      await Promise.all(promises);
    } catch (e) {
      throw new Errors.Init.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, e);
    }

    // hds 3
    try {
      await Profile.set(awid, Profiles.AUTHORITIES, dtoIn.uuAppProfileAuthorities);
    } catch (e) {
      throw new Errors.Init.SetProfileFailed(
        { uuAppErrorMap },
        { uuAppProfileAuthorities: dtoIn.uuAppProfileAuthorities },
        e
      );
    }

    // hds 4
    const uuObject = {
      awid,
      name: dtoIn.name,
    };

    let shoplistMain;
    try {
      shoplistMain = await this.dao.create(uuObject);
    } catch (e) {
      throw new Errors.Init.ShoplistDaoCreateFailed({ uuAppErrorMap }, e);
    }

    // hds 5
    return { shoplistMain, uuAppErrorMap };
  }

  async load(uri, session, uuAppErrorMap = {}) {
    let awid = uri.getAwid();
    let dtoOut = {};

    // hds 1
    const asidData = await UuSubAppInstance.get();

    // hds 2
    const awidData = await UuAppWorkspace.get(awid);

    // hds 3
    const relatedObjectsMap = {
      uuAppUuFlsBaseUri: Config.get("fls_base_uri"),
      uuAppUuSlsBaseUri: Config.get("sls_base_uri"),
      // uuAppBusinessRequestsUri: Config.get("business_request_uri"),
      // uuAppBusinessModelUri: Config.get("business_model_uri"),
      // uuAppApplicationModelUri: Config.get("application_model_uri"),
      // uuAppUserGuideUri: Config.get("user_guide_uri"),
      // uuAppWebKitUri: Config.get("web_uri"),
      // uuAppProductPortalUri: Config.get("product_portal_uri"),
    };

    // hds 4
    const cmdUri = UriBuilder.parse(uri).setUseCase("sys/uuAppWorkspace/load").clearParameters();
    const authorizationResult = await WorkspaceAuthorizationService.authorize(session, cmdUri.toUri());

    const profileData = {
      uuIdentityProfileList: authorizationResult.getIdentityProfiles(),
      profileList: authorizationResult.getAuthorizedProfiles(),
    };

    // hds 5
    dtoOut.sysData = { asidData, awidData, relatedObjectsMap, profileData };

    // hds 6, 6.A
    if (awidData.sysState !== "created") {
      // hds 6.A.1
      let shoplistMain;
      try {
        shoplistMain = await this.dao.getByAwid(awid);
      } catch (e) {
        throw new Errors.Load.ShoplistMainDoesNotExist({ uuAppErrorMap }, { awid }, e);
      }

      // hds 6.A.2
      dtoOut.data = { ...shoplistMain, relatedObjectsMap: {} };

      const shoppingListList = await this.shoppingListDao.list(awid);
      dtoOut.data.shoppingListList = shoppingListList.itemList;
    }

    // hds 7
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new ShoplistMainAbl();
