class MavenSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["maven", "sheet", "actor"],
      template: "systems/brindlewood-bay/src/Actors/Maven/maven-sheet.hbs",
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

    actorData.system.missingExperience =
      actorData.system.experience.max - actorData.system.experience.value;

    context.system = actorData.system;
    context.flags = actorData.flags;

    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html
      .find(".experience-control")
      .on("click contextmenu", this._onExperienceControl.bind(this));

    html.find(".condition-blur").on("blur", this._onConditionUpdate.bind(this));
  }

  async _onExperienceControl(event) {
    event.preventDefault();
    let experience = this.actor.system.experience;
    if (event.type == "contextmenu") {
      // left click
      if (experience.value > 0) {
        if (experience.value === 0) {
          return;
        }
        return await this.actor.update({
          ["system.experience.value"]: experience.value - 1,
        });
      }
    } else {
      // right click
      if (experience.value < experience.max) {
        if (experience.value >= 5) {
          return;
        }
        return await this.actor.update({
          ["system.experience.value"]: experience.value + 1,
        });
      }
    }
  }

  async _onConditionUpdate(event) {
    event.preventDefault();
    const target = event.target;
    const position = target.id.slice(-1);
    const conditions = this.actor.system.conditions;

    if (conditions[position] === target.value) {
      return;
    }

    conditions[position] = target.value;

    return await this.actor.update({
      ["system.conditions"]: conditions,
    });
  }
}

export default MavenSheet;
