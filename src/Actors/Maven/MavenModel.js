const END_SESSION_QUESTIONS = [
  { selected: true, question: "¿Han resuelto las Expertas algún misterio?" },
  {
    selected: false,
    question: "¿Has menoscabado en secreto la autoridad de un oficial local?",
  },
  {
    selected: false,
    question: "¿Has compartido tu sabiduría con una persona joven?",
  },
  {
    selected: false,
    question:
      "¿Has compartido un recuerdo de un miembro de la familia fallecido?",
  },
  {
    selected: false,
    question: "¿Te has comportado como una mujer con la mitad de tu edad?",
  },
  { selected: false, question: "¿Te has vuelto loquita por alguien?" },
  {
    selected: false,
    question: `¿Le has demostrado alguien que "Quién tuvo, retuvo"?`,
  },
];

const QUEEN_CROWNS = [
  {
    selected: false,
    crown: "Narra tu recuerdo más preciado con tu pareja fallecida.",
  },
  {
    selected: false,
    crown:
      "Narra una escena que te muestre como una hermana o hija imperfecta.",
  },
  {
    selected: false,
    crown: "Narra una escena que te muestre como una madre imperfecta.",
  },
  { selected: false, crown: "Narra tu recuerdo más preciado con tus hijos." },
  {
    selected: false,
    crown:
      "Narra una escena del presente que muestre un aspecto privado tuyo que pocas personas conocen.",
  },
  {
    selected: false,
    crown: "Narra una escena del presente que muestre un romance floreciente.",
  },
  {
    selected: false,
    crown:
      "Narra una escena del presente que muestre cómo satisfaces tus deseos físicos.",
  },
];

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
      endOfSessionQuestions: new fields.ArrayField(
        new fields.SchemaField({
          selected: new fields.BooleanField({
            required: true,
            initial: false,
          }),
          question: new fields.StringField({
            required: true,
            initial: "",
          }),
        }),
        {
          initial: END_SESSION_QUESTIONS,
        }
      ),
      queenCrowns: new fields.ArrayField(
        new fields.SchemaField({
          selected: new fields.BooleanField({
            required: true,
            initial: false,
          }),
          crown: new fields.StringField({
            required: true,
            initial: "",
          }),
        }),
        {
          initial: QUEEN_CROWNS,
        }
      ),
    };
  }
}

export default MavenData;
