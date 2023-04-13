"use strict";

const shoppingListCreateDtoInType = shape({
    name: uu5String().isRequired(),
    shoppingDate: uu5String()
});

const shoppingListGetDtoInType = shape({
    id: id().isRequired(),
});

const shoppingListUpdateDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(255).isRequired(),
    shoppingDate: uu5String(24).isRequired(),
});

const shoppingListDeleteDtoInType = shape({
    id: id().isRequired(),
});

const shoppingListListDtoInType = shape({
    sortBy: oneOf(["name", "shoppingDate"]),
    order: oneOf(["asc", "desc"]),
    pageInfo: shape({
        pageIndex: integer(),
        pageSize: integer()
    })
});

const shoppingListAddItemDtoInType = shape({
    id: id().isRequired(),
    itemId: id().isRequired(),
    name: uu5String(255).isRequired(),
    shoppingDate: uu5String(24).isRequired(),    
});

const shoppingListRemoveItemDtoInType = shape({
    id: id().isRequired(),
    itemId: id().isRequired(),
    name: uu5String(255).isRequired(),
    shoppingDate: uu5String(24).isRequired(),
});

const getItemsByListIdDtoInType = shape({
    id: id().isRequired(),
    pageInfo: shape({
        pageIndex: integer(),
        pageSize: integer()
    }).isRequired()
});

const deleteItemsByListIdDtoInType = shape({
    id: id().isRequired()
});

const shoppingListUpdateVisibilityDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(255).isRequired(),
    shoppingDate: uu5String(24).isRequired()
});





