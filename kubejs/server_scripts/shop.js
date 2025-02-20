// Load & Save Shop Data
function loadShopData() {
    return JsonIO.read('kubejs/config/shop.json') || { items: [], currency: "kubejs:gregtech_coins" };
}

function saveShopData(data) {
    JsonIO.write('kubejs/config/shop.json', data);
}

// Register Shop Commands
ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;

    event.register(
        Commands.literal("shop")
            .executes(ctx => {
                let player = ctx.source.player;
                openShopInventory(player, false);
                return 1;
            })
            .then(Commands.literal("admin")
                .requires(src => src.hasPermission(2)) // Admin-only
                .executes(ctx => {
                    let player = ctx.source.player;
                    openShopInventory(player, true);
                    return 1;
                })
            )
    );
});

// Open Shop as Inventory GUI (Chest)
function openShopInventory(player, isAdmin) {
    let shopData = loadShopData();
    let inventory = player.openInventory([
        "container",
        isAdmin ? "Admin Shop Editor" : "Shop",
        3 * 9 // 3-row inventory
    ]);

    // Place shop items
    shopData.items.forEach((item, index) => {
        if (index >= inventory.size) return;
        inventory.set(index, Item.of(item.id).withLore([
            `§aBuy: ${item.buy} ${shopData.currency}`,
            `§cSell: ${item.sell} ${shopData.currency}`,
            isAdmin ? "§eClick to Edit | Shift+Click to Delete" : "§7Click to Buy | Shift+Click to Sell"
        ]));
    });

    // Admin Controls (Add Button)
    if (isAdmin && shopData.items.length < inventory.size) {
        inventory.set(shopData.items.length, Item.of("minecraft:green_wool").withName("§aAdd Item"));
    }

    // Handle Clicks
    inventory.onClick((event) => {
        let clickedItem = event.item;
        if (!clickedItem || !clickedItem.id) return;
        
        if (isAdmin && clickedItem.id === "minecraft:green_wool") {
            openAddItemInventory(player);
            return;
        }

        let index = shopData.items.findIndex(i => i.id === clickedItem.id);
        if (index === -1) return;

        event.cancel(); // Prevent taking the item

        if (isAdmin) {
            if (event.shift) {
                shopData.items.splice(index, 1);
                saveShopData(shopData);
                player.tell(`§cDeleted ${clickedItem.id} from the shop!`);
            } else {
                openEditItemInventory(player, index);
            }
        } else {
            if (event.shift) {
                sellItem(player, shopData.items[index].id, shopData.items[index].sell);
            } else {
                buyItem(player, shopData.items[index].id, shopData.items[index].buy);
            }
        }

        openShopInventory(player, isAdmin); // Refresh inventory
    });

    player.tell(isAdmin ? "§cOpened Admin Shop Editor!" : "§6Opened Shop!");
}

// Buy Function
function buyItem(player, itemId, price) {
    let shopData = loadShopData();
    let currency = shopData.currency;

    if (player.inventory.count(currency) < price) {
        player.tell(`§cNot enough ${currency}!`);
        return;
    }

    player.inventory.clear(currency, price);
    player.give(Item.of(itemId, 1));
    player.tell(`§aBought 1 ${itemId} for ${price} ${currency}!`);
}

// Sell Function
function sellItem(player, itemId, price) {
    let shopData = loadShopData();
    let currency = shopData.currency;

    if (!player.inventory.has(Item.of(itemId, 1))) {
        player.tell(`§cYou don’t have any ${itemId} to sell!`);
        return;
    }

    player.inventory.clear(Item.of(itemId), 1);
    player.give(Item.of(currency).withCount(price));
    player.tell(`§aSold 1 ${itemId} for ${price} ${currency}!`);
}

// Open Add Item Inventory
function openAddItemInventory(player) {
    let inventory = player.openInventory([
        "container",
        "Add New Item",
        1 * 9 // Single row
    ]);

    // Example items for quick selection
    let exampleItems = ["minecraft:diamond", "minecraft:iron_ingot", "minecraft:gold_ingot"];
    
    exampleItems.forEach((id, index) => {
        inventory.set(index, Item.of(id).withName(`§aAdd ${id}`));
    });

    // Handle Clicks
    inventory.onClick((event) => {
        let clickedItem = event.item;
        if (!clickedItem || !clickedItem.id) return;
        
        let shopData = loadShopData();
        shopData.items.push({ id: clickedItem.id, buy: 10, sell: 5 });
        saveShopData(shopData);

        player.tell(`§aAdded ${clickedItem.id} to shop!`);
        openShopInventory(player, true);
    });
}

// Open Edit Item Inventory
function openEditItemInventory(player, index) {
    let shopData = loadShopData();
    let item = shopData.items[index];

    let inventory = player.openInventory([
        "container",
        `Edit ${item.id}`,
        1 * 9 // Single row
    ]);

    inventory.set(0, Item.of(item.id).withName("§eItem"));
    inventory.set(3, Item.of("kubejs:gregtech_coins").withName(`§aBuy: ${item.buy}`));
    inventory.set(5, Item.of("kubejs:gregtech_coins").withName(`§cSell: ${item.sell}`));
    inventory.set(8, Item.of("minecraft:barrier").withName("§cCancel"));

    // Handle Clicks
    inventory.onClick((event) => {
        let clickedItem = event.item;
        if (!clickedItem || !clickedItem.id) return;

        event.cancel();

        if (clickedItem.id === "minecraft:barrier") {
            openShopInventory(player, true);
            return;
        }

        if (clickedItem.id === "kubejs:gregtech_coins") {
            if (event.slot === 3) {
                item.buy += 1;
            } else if (event.slot === 5) {
                item.sell += 1;
            }
            saveShopData(shopData);
            openEditItemInventory(player, index);
        }
    });
}
