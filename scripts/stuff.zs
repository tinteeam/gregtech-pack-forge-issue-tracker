import crafttweaker.api.command.CommandSource;
import crafttweaker.api.game.Game;

var recipetypes = Game.recipeTypes();


// CommandSource.sendMessage(component as Component);
CommandSource.sendMessage("recipe types in this pack currently: ", recipetypes.toString());