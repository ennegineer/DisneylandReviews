var reviews;

// use D3 to read in reviews.json
d3.json("./data/reviews.json").then(function (data) {
reviews = data;
console.log(reviews[0]);
});