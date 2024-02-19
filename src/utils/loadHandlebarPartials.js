export async function loadHandleBarTemplates() {
  // register templates parts

  const mavenSheetPartialsBasePath =
    "systems/brindlewood-bay/src/Actors/Maven/partials/";

  const templatePaths = [
    `${mavenSheetPartialsBasePath}abilities.hbs`,
    `${mavenSheetPartialsBasePath}experience.hbs`,
    `${mavenSheetPartialsBasePath}conditions.hbs`,
    `${mavenSheetPartialsBasePath}home-sweet-home.hbs`,
  ];

  return loadTemplates(templatePaths);
}
