ServerEvents.recipes(event => {
    event.shaped(
        Item.of('kubejs:material_upgrader_lv'),
        ['ABA', 'CDC', 'AEA'],
        {
            A: 'minecraft:coal',
            B: 'minecraft:charcoal',
            C: 'minecraft:iron_ingot',
            D: 'gtce:lv_machine_casing',
            E: 'gtce:lv_circuit'
        }
    )
})