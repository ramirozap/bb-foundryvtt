export async function loadHandleBarTemplates() {
  // register templates parts

  const mavenSheetPartialsBasePath =
    "systems/brindlewood-bay/src/Actors/Maven/partials/";

  const templatePaths = [
    `${mavenSheetPartialsBasePath}abilities.hbs`,
    `${mavenSheetPartialsBasePath}experience.hbs`,
    `${mavenSheetPartialsBasePath}conditions.hbs`,
    `${mavenSheetPartialsBasePath}home-sweet-home.hbs`,
    `${mavenSheetPartialsBasePath}end-of-session.hbs`,
    `${mavenSheetPartialsBasePath}queen-crowns.hbs`,
  ];

  return loadTemplates(templatePaths);
}
