const puppeteer = require("puppeteer");
const fs = require("fs");

const gtBets = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://www.gtbets.eu/wagering1.asp?mode=lines&league=NBA&lg=1&lv=1"
  );
  await page.waitFor(5000);
  const games = await page.$$eval("td.wagering-event-team", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeGames = await games.toString();
  const spread = await page.$$eval("td.wagering-event-spread", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeSpread = await spread.toString();
  const money = await page.$$eval("td.wagering-event-money", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeMoney = await money.toString();
  const total = await page.$$eval("td.wagering-event-total", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  const seeTotal = await total.toString();

  const gameArr = await seeGames.split(",");
  const spreadArr = await seeSpread.split(",");
  const moneyArr = await seeMoney.split(",");
  const totalArr = await seeTotal.split(",");

  let arr = [];

  for (let i = 0; i < gameArr.length; i += 2) {
    await arr.push({
      teams: [gameArr[i], gameArr[i + 1]],
      spread: [spreadArr[i], spreadArr[i + 1]],
      money: [moneyArr[i], moneyArr[i + 1]],
      total: [totalArr[i], totalArr[i + 1]],
    });
  }
  //   let gameObjs = [];
  //let num = 0;
  //   while (num < 1) {
  fs.writeFileSync("dist.json", JSON.stringify(arr));
  //await
  //     num += 1;
  //   }
  console.log("yes");
  await browser.close();
  //console.log();
};

gtBets();

const hmmmm = String(fs.readFileSync("dist.json"));
