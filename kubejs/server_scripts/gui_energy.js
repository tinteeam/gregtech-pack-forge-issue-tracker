BlockEvents.rightClicked('kubejs:energy_block', event => {
    let { player, block } = event

    let energyStored = block.data.energy ?? 0
    let io_sides = block.data.io_sides ?? [0, 0, 0, 0, 0, 0]

    player.openGui('energy_block', gui => {
        gui.title('Energy Storage Block')
        gui.text(`Energy: ${energyStored} FE`, 10, 10)

        // Buttons for side configuration
        let sides = ['North', 'South', 'East', 'West', 'Up', 'Down']
        for (let i = 0; i < 6; i++) {
            let currentMode = io_sides[i]
            let modeText = currentMode === 0 ? 'Disabled' : currentMode === 1 ? 'Input' : 'Output'

            gui.button(10, 30 + i * 20, 80, 20, `${sides[i]}: ${modeText}`, () => {
                io_sides[i] = (currentMode + 1) % 3
                block.data.io_sides = io_sides
                player.tell(`${sides[i]} set to ${modeText}`)
            })
        }
    })
})
