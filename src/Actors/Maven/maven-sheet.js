export class MavenSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["maven", "sheet", "actor"],
      template: "systems/brindlewood-bay/src/Actors/Maven/maven-sheet.html",
      width: 600,
      height: 600,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "features",
        },
      ],
    });
  }
}
