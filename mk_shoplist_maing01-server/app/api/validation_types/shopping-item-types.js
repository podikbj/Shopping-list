"use strict";

const shoppingItemCreateDtoInType = shape({
    name: uu5String(255).isRequired(),
    quantity: uu5String(100).isRequired(),
    isDone: boolean().isRequired(),
    shoppingListId: id().isRequired()
});


const shoppingItemUpdateDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(255).isRequired(),
    quantity: uu5String(100).isRequired(),
    isDone: boolean().isRequired(),
    shoppingListId: id().isRequired()
});

const shoppingItemDeleteDtoInType = shape({
    id: id().isRequired(),
    shoppingListId: id().isRequired()
});

const shoppingItemVisibilityUpdateDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(255).isRequired(),
    quantity: uu5String(100).isRequired(),
    isDone: boolean().isRequired(),
    shoppingListId: id().isRequired()
});
