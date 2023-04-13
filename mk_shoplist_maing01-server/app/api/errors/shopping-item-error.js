"use strict";

const ShoplistMainUseCaseError = require("./shoplist-main-use-case-error.js");

const CreateShoppingItem = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}shoppingItem/create/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateShoppingItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ShoppingItemDaoCreateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateShoppingItem.UC_CODE}shoppingItemDaoCreateFailed`;
      this.message = "Create shopping item by shopping item Dao create failed.";
    }
  },

  UserNotAuthorized: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateShoppingItem.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
};

const UpdateShoppingItem = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}shoppingItem/update/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ShoppingItemDaoUpdateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingItem.UC_CODE}shoppingItemDaoUpdateFailed`;
      this.message = "Update shopping item by shopping item Dao update failed.";
    }
  },
  ShoppingItemDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingItem.UC_CODE}shoppingItemDoesNotExist`;
      this.message = "Shopping item does not exist.";
    }
  },
  UserNotAuthorized: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingItem.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  ShoppingItemDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingItem.UC_CODE}shoppingItemDaoGetFailed`;
      this.message = "Get shopping item by shopping item Dao get failed.";
    }
  },
};

const DeleteShoppingItem = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}shoppingItem/delete/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteShoppingItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ShoppingItemDaoDeleteFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteShoppingItem.UC_CODE}shoppingItemDaoDeleteFailed`;
      this.message = "Delete shopping item by shopping item Dao delete failed.";
    }
  },
  ShoppingItemDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteShoppingItem.UC_CODE}shoppingItemDoesNotExist`;
      this.message = "Shopping item does not exist.";
    }
  },
  UserNotAuthorized: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteShoppingItem.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  ShoppingItemDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteShoppingItem.UC_CODE}shoppingItemDaoGetFailed`;
      this.message = "Get shopping item by shopping item Dao get failed.";
    }
  },
};

const UpdateShoppingItemVisibility = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}shoppingItem/updateVisibility/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingItemVisibility.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ShoppingItemDaoUpdateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingItemVisibility.UC_CODE}shoppingItemDaoUpdateVisibilityFailed`;
      this.message = "Update shopping item by shopping item Dao update failed.";
    }
  },
  ShoppingItemDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingItemVisibility.UC_CODE}shoppingItemDoesNotExist`;
      this.message = "Shopping item does not exist.";
    }
  },
  UserNotAuthorized: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingItemVisibility.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  ShoppingItemDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingItemVisibility.UC_CODE}shoppingItemDaoGetFailed`;
      this.message = "Get shopping item by shopping item Dao get failed.";
    }
  },
};


module.exports = {
  CreateShoppingItem,
  UpdateShoppingItem,
  DeleteShoppingItem,
  UpdateShoppingItemVisibility
};