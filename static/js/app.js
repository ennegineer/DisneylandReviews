var reviews;
var countries;
var reviewsums;

// use D3 to read in reviews.json
d3.json("./data/reviews.json").then(function (data) {
reviews = data;
console.log(reviews[0]);
});

// use D3 to read in summary.json
d3.json("./data/summary.json").then(function (summdata) {
    reviewsums = summdata;
});


// use D3 to read in countries.json
d3.json("./data/countries.json").then(function (countrydata) {
    countries = countrydata;
    console.log(countries[0]);
    // get a list of countries for the dropdown
    select = document.getElementById("selDataset");
    for (let i = 0; i < countries.length; i++) {
        var opt = document.createElement("option");
        row = countries[i];
        opt.value = row;
        opt.innerHTML = row;
        select.appendChild(opt);
    }
    optionChanged(countries[0]);
});


function optionChanged(selectedID) {
    // Grab the metadata for the selected ID
    // Loop through the array of data
    for (let i = 0; i < countries.length; i++) {
      row = reviewsums[i];
      // Compare value to selected argument
      if (row.Reviewer_Location == selectedID) {
        var reviewAvg = row.Avg_Rating;
        var reviewCount = row.Reviews_Count;
      }
    }
    // country info
    d3.select("#countrydata").html(`<p><strong>Reviewers from ${selectedID}</strong> give Disneyland <br>
    a rating of ${reviewAvg} on average.<br>
    ${reviewCount} people from this country have left a review. <br></p>`)
};
