// curl 'https://adventofcode.com/2016/day/11/answer'
//  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0'
//  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
//  -H 'Accept-Language: en-US,en;q=0.5' --compressed
//  -H 'Content-Type: application/x-www-form-urlencoded'
//  -H 'Origin: https://adventofcode.com' -H 'DNT: 1' -H 'Connection: keep-alive'
//  -H 'Referer: https://adventofcode.com/2016/day/11'
//  -H 'Cookie: _ga=GA1.2.822856961.1585322260; session=<session>'
//  -H 'Upgrade-Insecure-Requests: 1' -H 'TE: Trailers' --data-raw 'level=1&answer=123'

const fs = require('fs');

const getExecStr = (year, day, answer, level) => {
	const session = fs.readFileSync("../session").toString("utf-8");
	day = day < 10 ? '0' + day : day;
	return `curl 'https://adventofcode.com/${year}/day/${day}/answer'` + 
	// return `curl 'https://localhost:8080/${year}/day/${day}/answer'` + 
		" -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0'" +
		" -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'" +
		" -H 'Accept-Language: en-US,en;q=0.5' --compressed" +
		" -H 'Content-Type: application/x-www-form-urlencoded'" +
		" -H 'Origin: https://adventofcode.com' -H 'DNT: 1' -H 'Connection: keep-alive'" +
		" -H 'Referer: https://adventofcode.com/2016/day/11'" +
		` -H 'Cookie: _ga=GA1.2.822856961.1585322260; session=${session}'` +
		` -H 'Upgrade-Insecure-Requests: 1' -H 'TE: Trailers' --data-raw 'level=${level}&answer=${answer}'` +
		" > response";
}

module.exports = {
	getExecStr
}