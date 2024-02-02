import { Maven, MavenSheet } from "./Actors/index.js";

Hooks.on("init", () => {
  CONFIG.Actor.systemDataModels.maven = Maven;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("brindlewood-bay", MavenSheet, { makeDefault: true });
});
