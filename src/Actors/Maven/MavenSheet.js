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

    html.on(
      "click",
      ".home-sweet-home-add",
      this._onAddHomeSweetHomeItem.bind(this)
    );

    html.on(
      "click",
      ".home-sweet-home-remove",
      this._onRemoveHomeSweetHomeItem.bind(this)
    );

    html.on(
      "click contextmenu",
      ".home-sweet-home-checkbox",
      this._onUseHomeSweetHomeItem.bind(this)
    );

    html.on(
      "blur",
      ".home-sweet-home-blur",
      this._onHomeSweetHomeItemUpdate.bind(this)
    );
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
    const element = event.currentTarget;
    const position = element.dataset.position;
    const conditions = this.actor.system.conditions;

    if (conditions[position] === element.value) {
      return;
    }

    conditions[position] = element.value;

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

    const newValue =
      this.actor.system.selectedRollType === event.currentTarget.value
        ? "2d6"
        : event.currentTarget.value;

    return await this.actor.update({
      ["system.selectedRollType"]: newValue,
    });
  }

  async _onAddHomeSweetHomeItem(event) {
    event.preventDefault();

    const homeSweetHomeItems = this.actor.system.homeSweetHomeItems;
    homeSweetHomeItems.push({ used: false, name: "" });

    return await this.actor.update({
      ["system.homeSweetHomeItems"]: homeSweetHomeItems,
    });
  }

  async _onRemoveHomeSweetHomeItem(event) {
    event.preventDefault();
    const position = event.currentTarget.dataset.position;

    const homeSweetHomeItems = this.actor.system.homeSweetHomeItems;
    homeSweetHomeItems.splice(position, 1);

    return await this.actor.update({
      ["system.homeSweetHomeItems"]: homeSweetHomeItems,
    });
  }

  _onUseHomeSweetHomeItem(event) {
    event.preventDefault();
    const position = event.currentTarget.dataset.position;
    const homeSweetHomeItems = this.actor.system.homeSweetHomeItems;

    if (event.type == "contextmenu") {
      homeSweetHomeItems[position].used = false;
    } else {
      homeSweetHomeItems[position].used = true;
    }

    return this.actor.update({
      ["system.homeSweetHomeItems"]: homeSweetHomeItems,
    });
  }

  async _onHomeSweetHomeItemUpdate(event) {
    event.preventDefault();
    const position = event.currentTarget.dataset.position;
    const homeSweetHomeItems = this.actor.system.homeSweetHomeItems;

    homeSweetHomeItems[position].name = event.currentTarget.value;

    return await this.actor.update({
      ["system.homeSweetHomeItems"]: homeSweetHomeItems,
    });
  }
}

export default MavenSheet;
