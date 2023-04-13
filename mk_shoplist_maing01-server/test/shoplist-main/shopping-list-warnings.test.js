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

  test("#1 list/create, DtoIn contains unsupported keys.", async () => {

    let dtoIn = {
      name: "My first shopping list",
      shoppingDate: "2022-12-01T00:20:21.144Z",
      visibility: true
    };

    let result = await TestHelper.executePostCommand("shoppingList/create", dtoIn);

    expect(result.data.uuAppErrorMap["mk-shoplist-main/shoppingList/create/unsupportedKeys"]["message"])
      .toEqual("DtoIn contains unsupported keys.");
    expect(result.data.uuAppErrorMap["mk-shoplist-main/shoppingList/create/unsupportedKeys"]["type"])
      .toEqual("warning");
    expect(result.data.uuAppErrorMap["mk-shoplist-main/shoppingList/create/unsupportedKeys"]["paramMap"]
    ["unsupportedKeyList"].length).toEqual(1);

  });

  test("#2 list/get, DtoIn contains unsupported keys.", async () => {

    let dForCreating = {
      name: "My first shopping list",
      shoppingDate: "2022-12-01T00:20:21.144Z"
    };

    let createdList = await TestHelper.executePostCommand("shoppingList/create", dForCreating);
    expect(createdList.data.name).toEqual(dForCreating.name);
    expect(createdList.data.shoppingDate).toEqual(dForCreating.shoppingDate);

    dtoIn = {
      id: createdList.id,
      name: createdList.name,
      shoppingDate: createdList.shoppingDate
    };

    result = await TestHelper.executeGetCommand("shoppingList/get", dtoIn);

    expect(result.data.uuAppErrorMap["mk-shoplist-main/shoppingList/get/unsupportedKeys"]["message"])
      .toEqual("DtoIn contains unsupported keys.");
    expect(result.data.uuAppErrorMap["mk-shoplist-main/shoppingList/get/unsupportedKeys"]["type"])
      .toEqual("warning");
    expect(result.data.uuAppErrorMap["mk-shoplist-main/shoppingList/get/unsupportedKeys"]["paramMap"]
    ["unsupportedKeyList"].length).toEqual(2);
  });

  test("#3 list/update, DtoIn contains unsupported keys.", async () => {

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
      id: gettingList.id,
      name: "My updated second shopping list",
      shoppingDate: "2022-12-05T00:20:21.144Z",
      visibility: false
    };

    let result = await TestHelper.executePostCommand("shoppingList/update", dtoIn);

    expect(result.data.uuAppErrorMap["mk-shoplist-main/shoppingList/update/unsupportedKeys"]["message"])
      .toEqual("DtoIn contains unsupported keys.");
    expect(result.data.uuAppErrorMap["mk-shoplist-main/shoppingList/update/unsupportedKeys"]["type"])
      .toEqual("warning");
    expect(result.data.uuAppErrorMap["mk-shoplist-main/shoppingList/update/unsupportedKeys"]["paramMap"]
    ["unsupportedKeyList"].length).toEqual(1);

  });

});