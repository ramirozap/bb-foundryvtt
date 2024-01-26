import { Maven, MavenSheet } from "./Actors/index.js";

Hooks.on("init", () => {
  CONFIG.Actor.systemDataModels.character = Maven;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("brindlewood-bay", MavenSheet, { makeDefault: true });
});
