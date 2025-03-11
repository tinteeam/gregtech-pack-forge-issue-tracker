import mods.recipestages.Recipes;
import crafttweaker.api.command.CommandSource;
import crafttweaker.api.game.Game;

// A function to give a player a stage when they pick up an item
Game.onPlayerPickupItem(function(player, item) {
    print("Player picked up item: " + item.getDefinition().getId()); // Debug statement
    if(item.getDefinition().getId() == "minecraft:oak_log") {
        print("Executing command for player: " + player.getName()); // Debug statement
        CommandSource.execute("gamestage add " + player.getName() + " planks"); // Ensure CommandSource is used
        Recipes.unlockStage("planks", player);
    }
});

// A test stage
Recipes.setRecipeStage("planks", <item:minecraft:oak_planks>);
