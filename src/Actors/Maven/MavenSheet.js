class MavenSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["maven", "sheet", "actor"],
      template: "systems/brindlewood-bay/src/Actors/Maven/maven-sheet.hbs",
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

  /** @override */
  getData() {
    const context = super.getData();

    const actorData = context.data;

    actorData.system.missingExperience =
      actorData.system.experience.max - actorData.system.experience.value;

    context.system = actorData.system;
    context.flags = actorData.flags;

    context.rollData = context.actor.getRollData();
    context.rollModifiers = {
      rollTypes: [
        { label: "ADV", value: "3d6dl" },
        { label: "DIS", value: "3d6dh" },
      ],
    };

    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html
      .find(".experience-control")
      .on("click contextmenu", this._onExperienceControl.bind(this));

    html.find(".condition-blur").on("blur", this._onConditionUpdate.bind(this));

    // Rollable abilities.
    html.on("click", ".rollable", this._onRoll.bind(this));

    html.on("click", ".advantage-mod", this._onSelectModifier.bind(this));
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

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onRoll(event) {
    event.preventDefault();

    const element = event.currentTarget;
    const dataset = element.dataset;
    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == "item") {
        const itemId = element.closest(".item").dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `${dataset.label}` : "";
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get("core", "rollMode"),
      });

      await this.actor.update({
        ["system.selectedRollType"]: "2d6",
      });

      return roll;
    }
  }

  async _onSelectModifier(event) {
    event.preventDefault();

    console.log("SelectModifier", this.actor.selectedRollType);

    const newValue =
      this.actor.system.selectedRollType === event.currentTarget.value
        ? "2d6"
        : event.currentTarget.value;

    return await this.actor.update({
      ["system.selectedRollType"]: newValue,
    });
  }
}

export default MavenSheet;
