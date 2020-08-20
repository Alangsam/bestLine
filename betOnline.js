const puppeteer = require("puppeteer");
const fs = require("fs");

const gtBets = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.bovada.lv/sports/basketball");
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

  let arr = [];

  for (let i = 0; i < gameArr.length; i += 2) {
    await arr.push({
      teams: [gameArr[i], gameArr[i + 1]],
      spread: [spreadArr[i], spreadArr[i + 1]],
      money: [spreadArr[i + 2], spreadArr[i + 3]],
      total: [spreadArr[i + 4], spreadArr[i + 5]],
    });
  }

  fs.writeFileSync("distB.json", JSON.stringify(arr));
  //await
  //     num += 1;
  //   }
  console.log(arr);
  //await browser.close();
  //console.log();
};

gtBets();

//const hmmmm = String(fs.readFileSync("dist.json"));
