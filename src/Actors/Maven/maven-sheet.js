export class MavenSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["maven", "sheet", "actor"],
      template: "systems/brindlewood-bay/src/Actors/Maven/maven-sheet.html",
      width: 600,
      height: 800,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "features",
        },
      ],
    });
  }

  /** @override */
  getData() {
    const context = super.getData();

    const actorData = context.data;

    context.system = actorData.system;
    context.flags = actorData.flags;

    return context;
  }
}
