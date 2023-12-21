function jsf32(a, b, c, d) {
    return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        var t = a - (b << 27 | b >>> 5) | 0;
        a = b ^ (c << 17 | c >>> 15);
        b = c + d | 0;
        c = d + t | 0;
        d = a + t | 0;
        return (d >>> 0) / 4294967296;
    }
}

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}

function getProblemsInRanking(problems, min_ranking, max_ranking) {
    let result = []
    for (var x in problems) {
        if (problems[x].rating <= max_ranking && problems[x] >= min_ranking) {
            result.push(problems[x])
        }
    }
    return result
}

fetch('https://codeforces.com/api/problemset.problems').then(r => r.text()).then(async result => {
    // Result now contains the response text, do what you want...
    result = JSON.parse(result)

    problems = result.result.problems
    chrome.storage.sync.get(
        { mini: 800, maxi: 2200 },
        (items) => {
            let candidates = getProblemsInRanking(problems, items.mini, items.maxi)
            let date = new Date()
            let seed = cyrb128(date.toString())
            let rand = jsf32(seed[0], seed[1], seed[2], seed[3])
            let index = rand()
            index = Math.floor(index * candidates.length)
            console.log(index)
            console.log(candidates)
            let item = candidates[index];
            window.open("https://codeforces.com/problemset/problem/" + item.contestId + "/" + item.index, "_blank")
        }
    );


})