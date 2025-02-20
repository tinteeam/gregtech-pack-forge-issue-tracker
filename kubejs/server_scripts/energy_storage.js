ServerEvents.tick(event => {
    let world = event.server.getOverworld()

    world.blocks.forEach(block => {
        if (block.id !== 'kubejs:energy_block') return

        let energyStored = block.data.energy ?? 0
        let io_sides = block.data.io_sides ?? [0, 0, 0, 0, 0, 0] // Default all sides disabled

        let directions = ['north', 'south', 'east', 'west', 'up', 'down']

        for (let i = 0; i < 6; i++) {
            let neighbor = block.offset(directions[i])
            if (!neighbor || neighbor.id === 'minecraft:air') continue

            let neighborEnergy = neighbor.data.energy ?? 0
            let neighborCapacity = neighbor.data.energy_capacity ?? 100000

            // Energy Input
            if (io_sides[i] === 1 && neighborEnergy > 0) {
                let transfer = Math.min(100, neighborEnergy, 100000 - energyStored)
                block.data.energy = energyStored + transfer
                neighbor.data.energy = neighborEnergy - transfer
            }
            // Energy Output
            else if (io_sides[i] === 2 && energyStored > 0) {
                let transfer = Math.min(100, energyStored, neighborCapacity - neighborEnergy)
                block.data.energy = energyStored - transfer
                neighbor.data.energy = neighborEnergy + transfer
            }
        }
    })
})
