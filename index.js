const gtBets = require("./gtBets");
const bovada = require("./bovada");
const bookMaker = require("./bookMaker");
const fanDuel = require("./fanDuel");
const dist = require("./dist.json");
const distB = require("./distB.json");
const distC = require("./distC.json");
const distD = require("./distD.json");

async function findBestLine(teamOrCity) {
  //   await gtBets;
  //   await bovada;
  //   await bookMaker;
  //   await fanDuel;

  const teamRegex = new RegExp(teamOrCity, "i");
  const matchingGameObjectsDist = dist.filter((obj) =>
    teamRegex.test(obj.teams)
  );

  const matchingGameObjectsDistB = distB.filter((obj) =>
    teamRegex.test(obj.teams)
  );

  const matchingGameObjectsDistC = distC.filter((obj) =>
    teamRegex.test(obj.teams)
  );

  const matchingGameObjectsDistD = distD.filter((obj) =>
    teamRegex.test(obj.teams)
  );

  console.log(
    matchingGameObjectsDist,
    matchingGameObjectsDistB,
    matchingGameObjectsDistC,
    matchingGameObjectsDistD
  );
}

findBestLine("Houston");
