import { MavenData, MavenSheet, Maven } from "./Actors/index.js";
import { loadHandleBarTemplates } from "./utils/loadHandlebarPartials.js";

Hooks.on("init", () => {
  CONFIG.Actor.systemDataModels.maven = MavenData;
  CONFIG.Actor.documentClass = Maven;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("brindlewood-bay", MavenSheet, { makeDefault: true });

  loadHandleBarTemplates();

  Handlebars.registerHelper("times", function (n, block) {
    var result = "";
    for (let i = 0; i < n; ++i) {
      result += block.fn(i);
    }
    return result;
  });

  Handlebars.registerHelper(
    "when",
    (operand_1, operator, operand_2, options) => {
      let operators = {
        //  {{#when <operand1> 'eq' <operand2>}}
        eq: (l, r) => l == r, //  {{/when}}
        noteq: (l, r) => l != r,
        gt: (l, r) => +l > +r, // {{#when var1 'eq' var2}}
        gteq: (l, r) => +l > +r || l == r, //               eq
        lt: (l, r) => +l < +r, // {{else when var1 'gt' var2}}
        lteq: (l, r) => +l < +r || l == r, //               gt
        or: (l, r) => l || r, // {{else}}
        and: (l, r) => l && r, //               lt
        "%": (l, r) => l % r === 0, // {{/when}}
      };
      let result = operators[operator](operand_1, operand_2);
      if (result) return options.fn(this);
      return options.inverse(this);
    }
  );
});
