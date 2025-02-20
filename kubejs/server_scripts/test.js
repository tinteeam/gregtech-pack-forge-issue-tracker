ServerEvents.recipes(event => {
    event.custom({
      type: 'tconstruct:alloy',
      inputs: [
        { tag: 'forge:molten_gold', amount: 90 },
        { tag: 'forge:molten_silver', amount: 90 }
      ],
      result: { fluid: 'tconstruct:molten_electrum', amount: 180 },
      temperature: 1
    })

    event.custom({
        type: "mekanism:metallurgic_infusing",
        chemicalInput: { amount: 100, tag: "mekanism:refined_obsidian" }, // 100 units of Refined Obsidian Infusion
        itemInput: { ingredient: { item: "minecraft:iron_ingot" } }, // 1 Iron Ingot
        output: { item: "mekanism:pellet_polonium" } // Produces 1 Polonium Pellet
    })
    
  })