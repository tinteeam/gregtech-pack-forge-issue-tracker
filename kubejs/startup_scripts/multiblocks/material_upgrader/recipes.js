GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event.create("material_upgrading")
        .category("test")
        .setEUIO("in")
        .setMaxIOSize(3,4,1,0)
        .setSlotOverlay(false,false, GuiTextures.BOX_OVERLAY)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
        .setSound("minecraft:block.furnace_fire_crackle")
        
})