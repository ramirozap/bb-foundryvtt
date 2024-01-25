import { Maven } from "./Actors";

Hooks.on("init", () => {
  CONFIG.Actor.systemDataModels.character = Maven;
});
