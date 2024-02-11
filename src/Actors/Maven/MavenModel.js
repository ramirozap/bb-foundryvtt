class MavenData extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      activity: new fields.HTMLField(),
      style: new fields.HTMLField(),
      experience: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true,
          min: 0,
          max: 5,
        }),
        max: new fields.NumberField({
          required: true,
          initial: 5,
          integer: true,
          min: 5,
          max: 5,
        }),
      }),
      conditions: new fields.ArrayField(new fields.StringField(), {
        initial: [" ", " ", " "],
      }),
      abilities: new fields.SchemaField({
        vitality: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true,
          max: 3,
          step: 1,
        }),
        composure: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true,
          max: 3,
          step: 1,
        }),
        reason: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true,
          max: 3,
          step: 1,
        }),
        presence: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true,
          max: 3,
          step: 1,
        }),
        sensitivity: new fields.NumberField({
          required: true,
          initial: -1,
          integer: true,
          max: 3,
          step: 1,
        }),
      }),
    };
  }
}

export default MavenData;
