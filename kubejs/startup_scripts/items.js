// Listen to item registry event
StartupEvents.registry('item', event => {
    // The texture for this item has to be placed in kubejs/assets/kubejs/textures/item/test_item.png
    // If you want a custom item model, you can create one in Blockbench and put it in kubejs/assets/kubejs/models/item/test_item.json
    event.create('example_item')
  
    event.create('gregtech_coins')
        .displayName('GregTech Coins')
        
        .maxStackSize(64)
        .tag('kubejs:gregtech_coins')
    // lv material upgrader
    // this item is used to upgrade materials on the material upgrader multiblock
    event.create('material_upgrader_lv')
        .displayName('Material Upgrader LV')
        
        .maxStackSize(1)
        .tag('kubejs:material_upgrader')
        .tooltip("This item is used to upgrade materials on the material upgrader multiblock")
    
    event.create('infinitium_ingot')
        .displayName('Infinitium Ingot')
        
        .maxStackSize(64)
        .tag('kubejs:infinitium_ingot')
        .tooltip("A creative item for creative item crafting \n This item will be used for crafting creative items and will be required for crafting infinity ingots from avaritia")
  })