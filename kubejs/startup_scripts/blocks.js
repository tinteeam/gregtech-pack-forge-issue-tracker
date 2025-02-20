StartupEvents.registry('block', event => {
  event.create('energy_block')
      .displayName('Energy Storage Block')
      .hardness(3.0)
      .tagBlock('minecraft:mineable/pickaxe')
})
