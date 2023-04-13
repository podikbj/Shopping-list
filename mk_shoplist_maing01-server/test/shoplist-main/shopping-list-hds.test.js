//
const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("Shopping list uuCMD tests", () => {

  test("#1 list/create, HDS", async () => {

    let dtoIn = {
      name: "My first shopping list",
      shoppingDate: "2022-12-01T00:20:21.144Z"
    };

    let result = await TestHelper.executePostCommand("shoppingList/create", dtoIn);
    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.shoppingDate).toEqual(dtoIn.shoppingDate);
    expect(result.data.uuAppErrorMap).toEqual({});

  });


  test("#2 list/get, HDS", async () => {
   

    let dForCreating = {
      name: "My first shopping list",
      shoppingDate: "2022-12-01T00:20:21.144Z"
    };

    let createdList = await TestHelper.executePostCommand("shoppingList/create", dForCreating);
    expect(createdList.data.name).toEqual(dForCreating.name);
    expect(createdList.data.shoppingDate).toEqual(dForCreating.shoppingDate);
    expect(createdList.data.uuAppErrorMap).toEqual({});

    dtoIn = {
      id: createdList.id,
    };

    let result = await TestHelper.executeGetCommand("shoppingList/get", dtoIn);

    expect(result.data.id).toEqual(dtoIn.id);
    expect(typeof result.data.name).toBe("string");
    expect(result.data.uuAppErrorMap).toEqual({});

  });

  test("#3 list/update, HDS", async () => {

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
      shoppingDate: "2022-12-05T00:20:21.144Z"
    };

    let result = await TestHelper.executePostCommand("shoppingList/update", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(typeof result.data.name).toBe("string");
    expect(result.data.id).toEqual(dtoIn.id);
    expect(typeof result.data.name).toBe("string");
    expect(result.data.shoppingDate).toEqual(dtoIn.shoppingDate);
    expect(typeof result.data.name).toBe("string");
    expect(result.data.uuAppErrorMap).toEqual({});
  });

  test("#4 shopping list/list, HDS", async () => {

    await TestHelper.executePostCommand("shoppingList/create", {
      name: "My first shopping list",
      shoppingDate: "2022-11-28T08:38:17.406Z"
    });

    await TestHelper.executePostCommand("shoppingList/create", {
      name: "My second shopping list",
      shoppingDate: "2022-11-27T08:38:17.406Z"
    });

    await TestHelper.executePostCommand("shoppingList/create", {
      name: "My third shopping list",
      shoppingDate: "2022-11-26T08:38:17.406Z"
    });

    await TestHelper.executePostCommand("shoppingList/create", {
      name: "My forth shopping list",
      shoppingDate: "2022-11-25T08:38:17.406Z"
    });

    let result = await TestHelper.executeGetCommand("shoppingList/list");

    expect(result.data.pageInfo.total).toEqual(4);
    expect(result.data.pageInfo.pageIndex).toEqual(0);
    expect(result.data.pageInfo.pageSize).toEqual(100);
    expect(result.data.itemList[0].name).toEqual("My first shopping list");
  });


  test("#5 shopping list/list, custom pageInfo", async () => {

    await TestHelper.executePostCommand("shoppingList/create", {
      name: "My first shopping list",
      shoppingDate: "2022-11-28T08:38:17.406Z"
    });

    await TestHelper.executePostCommand("shoppingList/create", {
      name: "My second shopping list",
      shoppingDate: "2022-11-27T08:38:17.406Z"
    });

    await TestHelper.executePostCommand("shoppingList/create", {
      name: "My third shopping list",
      shoppingDate: "2022-11-26T08:38:17.406Z"
    });

    await TestHelper.executePostCommand("shoppingList/create", {
      name: "My forth shopping list",
      shoppingDate: "2022-11-25T08:38:17.406Z"
    });

    let dtoIn = {
      pageInfo: {
        pageIndex: 1,
        pageSize: 2
      }
    };

    let result = await TestHelper.executeGetCommand("shoppingList/list", dtoIn);

    expect(result.data.pageInfo.total).toEqual(4);
    expect(result.data.pageInfo.pageIndex).toEqual(1);
    expect(result.data.pageInfo.pageSize).toEqual(2);
    expect(result.data.itemList.length).toEqual(2);
  });


});