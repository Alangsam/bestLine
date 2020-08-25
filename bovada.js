const puppeteer = require("puppeteer");
const fs = require("fs");

const bovada = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.bovada.lv/sports/basketball/nba");
  await page.waitFor(5000);
  const games = await page.$$eval("h4.competitor-name", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeGames = await games.toString();
  const spread = await page.$$eval("button.bet-btn", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeSpread = await spread.toString();

  const gameArr = await seeGames.split(",");
  const spreadArr = await seeSpread.split(",");
  // let moneyArr = [];
  // for (let i = 3; i < spreadArr.length; i += 6) {
  //   moneyArr.push(spreadArr[i], spreadArr[i + 1]);
  // }
  // let totalArr = []
  // for (let i = 3; i < spreadArr.length; i += 6) {
  //   moneyArr.push(spreadArr[i], spreadArr[i + 1]);
  // }

  let arr = [];

  for (let i = 0; i < gameArr.length; i += 2) {
    let card = {
      teams: [gameArr[i], gameArr[i + 1]],
      spread: [spreadArr[i * 3], spreadArr[i * 3 + 1]],
      money: [spreadArr[i * 3 + 2], spreadArr[i * 3 + 3]],
      total: [spreadArr[i * 3 + 4], spreadArr[i * 3 + 5]],
    };
    arr.push(card);
  }

  fs.writeFileSync("distB.json", JSON.stringify(arr));
  //await
  //     num += 1;
  //   }
  //console.log(gameArr, spreadArr);
  await browser.close();
  //console.log();
};

//bovada();

//const hmmmm = String(fs.readFileSync("dist.json"));

module.exports = bovada();
