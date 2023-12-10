fetch('https://codeforces.com/api/problemset.problems').then(r => r.text()).then(result => {
    // Result now contains the response text, do what you want...
    result = JSON.parse(result)

    problems = result.result.problems
    candidates = []

    for (var x in problems) {
        if (problems[x].rating < 1000) {
            candidates.push(problems[x])
        }
    }

    var item = candidates[Math.floor(Math.random() * candidates.length)];
    console.log(item)
    window.open("https://codeforces.com/problemset/problem/" + item.contestId + "/" + item.index, "_blank")

})