//
const { TestHelper } = require("uu_appg01_server-test");

beforeAll(async () => {
  await TestHelper.setup();
})

beforeEach(async () => {
//   await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
  await TestHelper.dropDatabase()
  //await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "." });
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe("Shopping list uuCMD tests", () => {

  test("#1 list/create, HDS", async () => {

    await TestHelper.login("Authorities"); 
  

    let dtoIn = {
      name: "My first shopping list",
      shoppingDate: "2022-12-01T00:20:21.144Z"
    };

    let result = await TestHelper.executePostCommand("shoppingList/create", dtoIn);
    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.shoppingDate).toEqual(dtoIn.shoppingDate);
    expect(result.data.uuAppErrorMap).toEqual({});

  });

  test("#2 list/create, Not authorized", async () => {

    
    await TestHelper.login("Readers"); 
  

    let dtoIn = {
      name: "My first shopping list",
      shoppingDate: "2022-12-01T00:20:21.144Z"
    };

    let result = await TestHelper.executePostCommand("shoppingList/create", dtoIn);
    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.shoppingDate).toEqual(dtoIn.shoppingDate);
    expect(result.data.uuAppErrorMap).toEqual({});

  });

});