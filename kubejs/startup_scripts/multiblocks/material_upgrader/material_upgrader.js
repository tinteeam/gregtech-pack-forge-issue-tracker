GTCEuStartupEvents.registry('gtceu:machine', event => {
  event.create('material_upgrader', 'multiblock')
      .rotationState(RotationState.NON_Y_AXIS)
      .recipeType('material_upgrader') // Custom Recipe Type
      .appearanceBlock(GTBlocks.CASING_TITANIUM_SOLID) // Default appearance

      .pattern(definition => FactoryBlockPattern.start()
          .aisle('CCC', 'CGC', 'CGC', 'CLC', 'CCC') // Top layer
          .aisle('CMC', 'GSG', 'G#G', 'LIL', 'COE') // Middle layer (Energy input added)
          .aisle('CKC', 'CGC', 'CGC', 'CLC', 'CNC') // Bottom layer

          // Controller Block (Machine Core)
          .where('K', Predicates.controller(Predicates.blocks(definition.getSelf()))) // ✅ Fix

          // Core Upgrading Component (Furnace)
          .where('M', Predicates.blocks('minecraft:furnace'))

          // Glass Casing (Using Quartz Glass)
          .where('G', Predicates.blocks('ae2:quartz_glass'))

          // Power Input Block (Glowstone)
          .where('I', Predicates.blocks('glowstone'))

          // Support Casings
          .where('L', Predicates.blocks(GTBlocks.CASING_GRATE.get()))
          .where('C', Predicates.blocks(GTBlocks.CASING_TITANIUM_SOLID.get())
              .or(Predicates.autoAbilities(definition.getRecipeTypes()))
          )

          // Muffler and Maintenance Slots
          .where('O', Predicates.abilities(PartAbility.MUFFLER).setExactLimit(1))
          .where('N', Predicates.abilities(PartAbility.MAINTENANCE))

          // **Energy Input Slot (Fixed)**
          .where('E', Predicates.abilities(PartAbility.ENERGY_INPUT).setMinGlobalLimited(1)) // ✅ Fix

          // Empty Air Space
          .where('#', Predicates.air())

          .build()
      )

      .workableCasingRenderer(
          'gtceu:block/casings/solid/machine_casing_solid_titanium', 
          'gtceu:block/multiblock/implosion_compressor', 
          false
      );
});
