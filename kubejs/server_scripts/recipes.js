ServerEvents.recipes(event => {
    event.shaped(
        Item.of('kubejs:material_upgrader_lv'),
        ['ABA', 'CDC', 'AEA'],
        {
            A: 'minecraft:iron_ingot',
            B: 'minecraft:gold_ingot',
            C: 'minecraft:diamond',
            D: 'gtce:lv_machine_casing',
            E: 'gtce:lv_circuit'
        }
    )
})