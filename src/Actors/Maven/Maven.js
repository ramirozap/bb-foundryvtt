class MavenData extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      name: new fields.HTMLField(),
      activity: new fields.HTMLField(),
      style: new fields.HTMLField(),
      abilities: new fields.SchemaField({
        vitality: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true,
        }),
        composure: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true,
        }),
        reason: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true,
        }),
        presence: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true,
        }),
        sensitivity: new fields.NumberField({
          required: true,
          initial: -1,
          integer: true,
        }),
      }),
      proficiencies: new fields.SchemaField({
        weapons: new fields.ArrayField(new fields.StringField()),
        skills: new fields.ArrayField(new fields.StringField()),
      }),
    };
  }
}

export default MavenData;
