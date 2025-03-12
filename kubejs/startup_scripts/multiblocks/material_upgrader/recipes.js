GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    event.create('material_upgrader')
        .category('material_upgrading')
        .setEUIO('in')
        .setMaxIOSize(2,1,1,1)
        .setProgressBar(GuiTextures.PROGRESS_BAR_ARROW, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.BATH)
        
})