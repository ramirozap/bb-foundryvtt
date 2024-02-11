export async function loadHandleBarTemplates() {
  // register templates parts

  const mavenSheetPartialsBasePath =
    "systems/brindlewood-bay/src/Actors/Maven/partials/";

  const templatePaths = [
    `${mavenSheetPartialsBasePath}abilities.hbs`,
    `${mavenSheetPartialsBasePath}experience.hbs`,
    `${mavenSheetPartialsBasePath}conditions.hbs`,
  ];

  return loadTemplates(templatePaths);
}
