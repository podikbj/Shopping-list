//
const { TestHelper } = require("uu_appg01_server-test");
const path = require("path");
const fs = require("fs");

beforeEach(async () => {

  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
  
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("Shopping list uuCMD tests", () => {

  test("#1 list/create, invalid dtoIn", async () => {

    let dtoIn = {

    };

    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("shoppingList/create", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("mk-shoplist-main/shoppingList/create/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(1);
      expect(e.status).toEqual(400);
    }
  });

  test("#2 list/get, invalid dtoIn", async () => {

    let dForCreating = {
      name: "My first shopping list",
      shoppingDate: "2022-12-01T00:20:21.144Z"
    };

    let createdList = await TestHelper.executePostCommand("shoppingList/create", dForCreating);
    expect(createdList.data.name).toEqual(dForCreating.name);
    expect(createdList.data.shoppingDate).toEqual(dForCreating.shoppingDate);
    expect(createdList.data.uuAppErrorMap).toEqual({});

    dtoIn = {

    };

    expect.assertions(6);
    try {
      await await TestHelper.executeGetCommand("shoppingList/get", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("mk-shoplist-main/shoppingList/get/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(1);
      expect(e.status).toEqual(400);
    }

  });

  test("#3 list/update, invalidDtoIn", async () => {

    let dForCreating = {
      name: "My second shopping list",
      shoppingDate: "2022-12-01T00:20:21.144Z"
    };

    let createdList = await TestHelper.executePostCommand("shoppingList/create", dForCreating);
    expect(createdList.data.name).toEqual(dForCreating.name);
    expect(createdList.data.shoppingDate).toEqual(dForCreating.shoppingDate);
    expect(createdList.data.uuAppErrorMap).toEqual({});

    dForGetting = {
      id: createdList.id
    };

    let gettingList = await TestHelper.executeGetCommand("shoppingList/get", dForGetting);
    expect(gettingList.data.id).toEqual(dForGetting.id);
    expect(gettingList.data.uuAppErrorMap).toEqual({});


    dtoIn = {

    };

    expect.assertions(8);
    try {
      await TestHelper.executePostCommand("shoppingList/update", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("mk-shoplist-main/shoppingList/update/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(3);
      expect(e.status).toEqual(400);
    }
  });

});