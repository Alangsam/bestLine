const { gtBets } = require("./gtBets");
const { bovada } = require("./bovada");
const { bookMaker } = require("./bookMaker");
const { fanDuel } = require("./fanDuel");
const dist = require("./dist.json");
const distB = require("./distB.json");
const distC = require("./distC.json");
const distD = require("./distD.json");
const readline = require("readline");

async function gatherAll() {
  await gtBets();
  await bovada();
  await bookMaker();
  await fanDuel();
}

async function findBestLine() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", async (input) => {
    await gatherAll().then((res) => console.log(res));

    const teamRegex = new RegExp(input, "i");
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

    rl.close();
  });
}

findBestLine();

///findBestLine("Dallas");
