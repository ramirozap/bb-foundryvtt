import { MavenData, MavenSheet, Maven } from "./Actors/index.js";

Hooks.on("init", () => {
  CONFIG.Actor.systemDataModels.maven = MavenData;
  CONFIG.Actor.documentClass = Maven;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("brindlewood-bay", MavenSheet, { makeDefault: true });

  Handlebars.registerHelper("times", function (n, block) {
    var result = "";
    for (let i = 0; i < n; ++i) {
      result += block.fn(i);
    }
    return result;
  });
});
