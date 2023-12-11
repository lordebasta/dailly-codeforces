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

function getProblemsUnderRanking(problems, max_ranking) {
    let result = []
    for (var x in problems) {
        if (problems[x].rating < max_ranking) {
            result.push(problems[x])
        }
    }
    return result
}

fetch('https://codeforces.com/api/problemset.problems').then(r => r.text()).then(result => {
    // Result now contains the response text, do what you want...
    result = JSON.parse(result)

    problems = result.result.problems
    let candidates = getProblemsUnderRanking(problems, 1000)

    let date = new Date()
    let rand = jsf32(date.getFullYear(), date.getMonth(), date.getDay(), date.getDate())

    var item = candidates[Math.floor(rand() * candidates.length)];
    window.open("https://codeforces.com/problemset/problem/" + item.contestId + "/" + item.index, "_blank")

})