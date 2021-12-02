const fs = require('fs');
const session = fs.readFileSync("../session").toString("utf-8");

const sendData = (year, day, answer, level) => {

  // fetch("https://adventofcode.com/2016/day/11/answer", {
  fetch(`https://adventofcode.com/${year}/day/${day}/answer`, {
    "credentials": "include",
    "headers": {
      "cookie": 'session=' + session
    },
    "referrer": `https://adventofcode.com/${year}/day/${year}`,
    "body": `level=${level}&answer=${answer}`,
    "method": "POST",
    "mode": "cors"
  })
  .then(res => res.text())
  .then(res => {
    const fst = res.indexOf('<main>');
    const snd = res.indexOf('</main>');

    const txt = res.slice(fst, snd).replace(/<.*?>/g,'').replaceAll('\n',' ');
    console.log(txt);
  });
}

module.exports = {
  sendData
}