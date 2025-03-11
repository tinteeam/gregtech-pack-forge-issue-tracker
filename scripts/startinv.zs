import mods.initialinventory.InvHandler;

InvHandler.addStartingItem("one", <item:minecraft:>, (stack as IItemStack, player as Player) as int => 20, (stack as crafttweaker.api.item.IItemStack, player as crafttweaker.api.entity.type.player.Player) as crafttweaker.api.item.IItemStack => {
      return stack * (player.level.random.nextInt(6) + 1);
 });