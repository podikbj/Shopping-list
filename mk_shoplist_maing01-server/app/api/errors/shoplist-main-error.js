"use strict";
const ShoplistMainUseCaseError = require("./shoplist-main-use-case-error.js");

const Init = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },

  ShoplistDaoCreateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}shoplistDaoCreateFailed`;
      this.message = "Create shoplist by DAO method failed.";
    }
  },
};

const Load = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}load/`,

  ShoplistMainDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}shoplistMainDoesNotExist`;
      this.message = "UuObject shopListMain does not exist.";
    }
  },
};

module.exports = {
  Init, Load
};
