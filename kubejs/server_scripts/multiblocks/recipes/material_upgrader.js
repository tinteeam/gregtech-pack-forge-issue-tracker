ServerEvents.recipes(event => {
    const gt = event.recipes.gtceu;

    gt.material_upgrading()
            .itemInputs("minecraft:coal")
            .notConsumable("kubejs:material_upgrader_lv")
            .itemOutputs("minecraft:iron_ingot")
            .duration(600)
            .EUt(10)
            .build();
    gt.material_upgrading()
         .itemInputs("minecraft:iron_ingot")
         .notConsumable("kubejs:material_upgrader_lv")
         .itemOutputs("minecraft:gold_ingot")
         .duration(1200)
         .EUt(30)
         .build();

    gt.material_upgrading()
         .itemInputs("minecraft:gold_ingot")
         .notConsumable("kubejs:material_upgrader_lv")
         .itemOutputs("minecraft:diamond")
         .duration(2400)
         .EUt(90)
         .build();

    gt.material_upgrading()
            .itemInputs("minecraft:diamond")
            .notConsumable("kubejs:material_upgrader_lv")
            .itemOutputs("minecraft:emerald")
            .duration(4800)
            .EUt(270)
            .build();

    gt.material_upgrading()
            .itemInputs("minecraft:emerald")
            .notConsumable("kubejs:material_upgrader_lv")
            .itemOutputs("minecraft:netherite_ingot")
            .duration(9600)
            .EUt(810)
            .build();
})