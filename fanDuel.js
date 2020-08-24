const puppeteer = require("puppeteer");
const fs = require("fs");

const gtBets = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://sportsbook.fanduel.com/sports/navigation/830.1/10107.3"
  );
  await page.waitForSelector("div.eventTitle", {
    visible: true,
  });
  const games = await page.$$eval("div.eventTitle", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeGames = await games.toString();
  const spread = await page.$$eval("div.value", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeSpread = await spread.toString();

  const gameArr = await seeGames.split(",");
  const spreadArr = await seeSpread.split(",");
  let arr = [];

  for (let i = 0; i < gameArr.length; i += 2) {
    await arr.push({
      teams: [gameArr[i], gameArr[i + 1]],
      spread: [spreadArr[i * 3], spreadArr[i * 3 + 1]],
      money: [spreadArr[i * 3 + 2], spreadArr[i * 3 + 3]],
      total: [spreadArr[i * 3 + 4], spreadArr[i * 3 + 5]],
    });
  }

  fs.writeFileSync("distD.json", JSON.stringify(arr));

  console.log(gameArr, spreadArr);
  //await browser.close();
  //console.log();
};

gtBets();

//const hmmmm = String(fs.readFileSync("dist.json"));
