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
            let rand = jsf32(date.getFullYear(), date.getMonth(), date.getDay(), date.getDate())
            console.log(candidates)
            var item = candidates[Math.floor(rand() * candidates.length)];
            console.log(candidates[item])
            window.open("https://codeforces.com/problemset/problem/" + item.contestId + "/" + item.index, "_blank")
        }
    );


})