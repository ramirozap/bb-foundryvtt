import { MavenData, MavenSheet, Maven } from "./Actors/index.js";

Hooks.on("init", () => {
  CONFIG.Actor.systemDataModels.maven = MavenData;
  CONFIG.Actor.documentClass = Maven;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("brindlewood-bay", MavenSheet, { makeDefault: true });
});
