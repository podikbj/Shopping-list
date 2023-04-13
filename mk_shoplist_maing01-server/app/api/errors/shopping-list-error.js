"use strict";

const ShoplistMainUseCaseError = require("./shoplist-main-use-case-error.js");

const CreateShoppingList = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}shoppingList/create/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateShoppingList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ShoppingListDaoCreateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateShoppingList.UC_CODE}shoppingListDaoCreateFailed`;
      this.message = "Create shopping list by shopping list Dao create failed.";
    }
  },
  UserNotAuthorized: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateShoppingList.UC_CODE}userNotAuthorized`;
      this.message = "User is not authorized.";
    }
  },
};

const GetShoppingList = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}shoppingList/get/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetShoppingList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ShoppingListDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetShoppingList.UC_CODE}shoppingListDaoGetFailed`;
      this.message = "Get shopping list by shopping list Dao get failed.";
    }
  },

  ShoppingListDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetShoppingList.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },
  // GetItemListByListId: class extends ShoplistMainUseCaseError {
  //   constructor() {
  //     super(...arguments);
  //     this.code = `${GetShoppingList.UC_CODE}GetItemListByListIdDaoFailed`;
  //     this.message = "Get shopping item list by shopping listid Dao failed.";
  //   }
  // },

};

const UpdateShoppingList = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}shoppingList/update/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ShoppingListDaoUpdateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingList.UC_CODE}shoppingListDaoUpdateFailed`;
      this.message = "Update shopping list by shopping list Dao update failed.";
    }
  },
  ShoppingListDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingList.UC_CODE}shoppingListDaoGetFailed`;
      this.message = "Get shopping list by shopping list Dao get failed.";
    }
  },
  ShoppingListDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingList.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },
  UserNotAuthorized: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingList.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  // GetItemListByListId: class extends ShoplistMainUseCaseError {
  //   constructor() {
  //     super(...arguments);
  //     this.code = `${UpdateShoppingList.UC_CODE}GetItemListByListIdDaoFailed`;
  //     this.message = "Get shopping item list by shopping listid Dao failed.";
  //   }
  // },

};

const DeleteShoppingList = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}shoppingList/delete/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteShoppingList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ShoppingListDaoDeleteFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteShoppingList.UC_CODE}shoppingListDaoDeleteFailed`;
      this.message = "Delete shopping list by shopping list Dao delete failed.";
    }
  },
  ShoppingListDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteShoppingList.UC_CODE}shoppingListDaoGetFailed`;
      this.message = "Get shopping list by shopping list Dao get failed.";
    }
  },
  ShoppingListDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteShoppingList.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Deleting shopping list does not exist.";
    }
  },
  UserNotAuthorized: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteShoppingList.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },

};

const ListShoppingList = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}shoppingList/list/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListShoppingList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ShoppingListDaoListFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListShoppingList.UC_CODE}shoppingListDaoListFailed`;
      this.message = "List shopping lists by shopping list Dao list failed.";
    }
  },
  GetItemListByListId: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListShoppingList.UC_CODE}GetItemListByListIdDaoFailed`;
      this.message = "Get shopping item list by shopping listid Dao failed.";
    }
  },

};

const GetItemsByListId = {
  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetItemsByListId.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  GetItemsByListIdDaoFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetItemsByListId.UC_CODE}GetItemsByListIdDaoFailed`;
      this.message = "Getting item by dao get item list by id get failed.";
    }
  },
  ShoppingListDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetItemsByListId.UC_CODE}shoppingListDaoGetFailed`;
      this.message = "Get shopping list by shopping list Dao get failed.";
    }
  },
  ShoppingListDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetItemsByListId.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },
};

const DeleteItemsByListId = {
  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteItemsByListId.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  DeleteItemsByListIdDaoFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteItemsByListId.UC_CODE}DeleteItemsByListIdDaoFailed`;
      this.message = "Delete item by dao delete item list by id get failed.";
    }
  },
  ShoppingListDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteItemsByListId.UC_CODE}shoppingListDaoGetFailed`;
      this.message = "Get shopping list by shopping list Dao get failed.";
    }
  },
  ShoppingListDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteItemsByListId.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },
};

const AddItem = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}shoppingList/addItem/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ShoppingListDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}shoppingListDaoGetFailed`;
      this.message = "Get shopping list by shopping list Dao get failed.";
    }
  },
  ShoppingListDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },
  UserNotAuthorized: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  ShoppingItemDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}shoppingItemDaoGetFailed`;
      this.message = "Get shopping item by shopping item Dao get failed.";
    }
  },
  ShoppingItemDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}shoppingItemDoesNotExist`;
      this.message = "Shopping item does not exist.";
    }
  },
  ShoppingListDaoAddItemFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}shoppingListDaoAddItemFailed`;
      this.message = "Add item by shopping list Dao add item get failed.";
    }
  },

};

const RemoveItem = {
  UC_CODE: `${ShoplistMainUseCaseError.ERROR_PREFIX}shoppingList/removeItem/`,

  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ShoppingListDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}shoppingListDaoGetFailed`;
      this.message = "Get shopping list by shopping list Dao get failed.";
    }
  },
  ShoppingListDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },
  UserNotAuthorized: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  ShoppingItemDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}shoppingItemDaoGetFailed`;
      this.message = "Get shopping item by shopping item Dao get failed.";
    }
  },
  ShoppingItemDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}shoppingItemDoesNotExist`;
      this.message = "Shopping item does not exist.";
    }
  },
  ShoppingListDaoRemoveItemFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}shoppingListDaoRemoveItemFailed`;
      this.message = "Remove item by shopping list Dao remove item get failed.";
    }
  },

};

const UpdateShoppingListVisibility = {
  InvalidDtoIn: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingListVisibility.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ShoppingListDaoGetFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingListVisibility.UC_CODE}shoppingListDaoGetFailed`;
      this.message = "Get shopping list by shopping list Dao get failed.";
    }
  },
  ShoppingListDoesNotExist: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingListVisibility.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Deleting shopping list does not exist.";
    }
  },
  UserNotAuthorized: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingListVisibility.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  ShoppingListDaoUpdateFailed: class extends ShoplistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateShoppingListVisibility.UC_CODE}shoppingListDaoUpdateFailed`;
      this.message = "Update shopping list by shopping list Dao update failed.";
    }
  },

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