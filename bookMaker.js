const puppeteer = require("puppeteer");
const fs = require("fs");

async function bookMaker() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.bookmaker.eu/live-lines/basketball/nba");
  await page.waitFor(5000);
  const games = await page.$$eval("div.team", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeGames = await games.toString();
  const spread = await page.$$eval("div.spread", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeSpread = await spread.toString();
  const money = await page.$$eval("div.money", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeMoney = await money.toString();
  const total = await page.$$eval("div.total", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeTotal = await total.toString();

  const gameArr = await seeGames.split(",");
  const spreadArr = await seeSpread.split(",");
  const moneyArr = await seeMoney.split(",");
  const totalArr = await seeTotal.split(",");

  const newGamesArr = await gameArr.filter((team) => team !== "");
  const newSpreadArr = await spreadArr.filter((line) => line !== "Line");
  const newMoneyArr = await moneyArr.filter((mLine) => mLine !== "Moneyline");
  const newTotalArr = await totalArr.filter((total) => total !== "Total");

  let arr = [];

  for (let i = 0; i < newGamesArr.length; i += 2) {
    await arr.push({
      teams: [newGamesArr[i], newGamesArr[i + 1]],
      spread: [newSpreadArr[i], newSpreadArr[i + 1]],
      money: [newMoneyArr[i], newMoneyArr[i + 1]],
      total: [newTotalArr[i], newTotalArr[i + 1]],
    });
  }

  fs.writeFileSync("distC.json", JSON.stringify(arr));
  //await
  //     num += 1;
  //   }
  //console.log(newGamesArr, spreadArr);
  await browser.close();
  //console.log();
}

//bookMaker();

//const hmmmm = String(fs.readFileSync("dist.json"));

module.exports = { bookMaker };
