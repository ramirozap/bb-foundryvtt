class MavenData extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      activity: new fields.HTMLField(),
      style: new fields.HTMLField(),
      expertMovement: new fields.HTMLField(),
      selectedRollType: new fields.StringField({
        required: true,
        initial: "2d6",
      }),
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
      homeSweetHomeItems: new fields.ArrayField(
        new fields.SchemaField({
          used: new fields.BooleanField({
            required: true,
            initial: false,
          }),
          name: new fields.StringField({
            required: true,
            initial: "",
          }),
        }),
        { initial: [{ used: false, name: "" }] }
      ),
      abilities: new fields.SchemaField({
        vitality: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true,
          max: 3,
          min: -3,
        }),
        composure: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true,
          max: 3,
          min: -3,
        }),
        reason: new fields.NumberField({
          required: true,
          initial: 1,
          integer: true,
          max: 3,
          min: -3,
        }),
        presence: new fields.NumberField({
          required: true,
          initial: 0,
          integer: true,
          max: 3,
          min: -3,
        }),
        sensitivity: new fields.NumberField({
          required: true,
          initial: -1,
          integer: true,
          max: 3,
          min: -3,
        }),
      }),
    };
  }
}

export default MavenData;
