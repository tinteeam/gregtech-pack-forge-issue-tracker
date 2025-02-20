// Listen to item registry event
StartupEvents.registry('item', event => {
    // The texture for this item has to be placed in kubejs/assets/kubejs/textures/item/test_item.png
    // If you want a custom item model, you can create one in Blockbench and put it in kubejs/assets/kubejs/models/item/test_item.json
    event.create('test_item')
  
    event.create('gregtech_coins')
        .displayName('GregTech Coins')
        .model('kubejs:item/gregtech_coins')
        .maxStackSize(64)
        .tag('kubejs:gregtech_coins')
  })