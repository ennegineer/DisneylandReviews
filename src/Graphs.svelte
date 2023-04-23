<script>
    import Plotly from 'plotly.js-dist-min'
    import {json, select, sum} from 'd3'
    import { onMount } from 'svelte'
    import reviews from './assets/data/reviews.json'
    import summ from './assets/data/summary.json'
        
      let numReviews = reviews.length;
      let R1 = reviews.filter( element => element.Rating == 1)
      let R2 = reviews.filter( element => element.Rating == 2)
      let R3 = reviews.filter( element => element.Rating == 3)
      let R4 = reviews.filter( element => element.Rating == 4)
      let R5 = reviews.filter( element => element.Rating == 5)

      let plotDiv;

      let paperbgcolor = '#353739';
      let fontcolor = '#47f0ff';

    
      let data = [{
        x: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        y: [R1.length, R2.length, R3.length, R4.length, R5.length],
        text: [R1.length, R2.length, R3.length.toLocaleString(), R4.length.toLocaleString(), R5.length.toLocaleString()],
        textposition: 'auto',
        type: 'bar',
        marker: {
                color: '#ff6b6b'
              }
      }];
    
      onMount(() => {
            new Plotly.newPlot(plotDiv, data, {
              width: 500, 
              height: 400, 
              title: "Total reviews per rating",
              paper_bgcolor: paperbgcolor,
              plot_bgcolor: paperbgcolor,
              font: {
                color: fontcolor
              }}, {showSendToCloud:true}); 
            new Plotly.newPlot(plotYr, newData, {
              width: 500,
              height: 400,
              title: "Average rating per year",
              paper_bgcolor: paperbgcolor,
              plot_bgcolor: paperbgcolor,
              font: {
                color: fontcolor
              }},
            {showSendToCloud:true});
            new Plotly.newPlot(plotCountries, countrySumm, {
              width: 1250,
              height: 800,
              title: "Average rating per country",
              paper_bgcolor: paperbgcolor,
              plot_bgcolor: paperbgcolor,
              font: {
                color: fontcolor
              }},
            {showSendToCloud:true});
            new Plotly.newPlot(plotSingles, singleSumm, {
              width: 700,
              height: 400,
              title: "Rating per country with only one review",
              paper_bgcolor: paperbgcolor,
              plot_bgcolor: paperbgcolor,
              font: {
                color: fontcolor
              }},
            {showSendToCloud:true});
      });
        

      let ratings = [1, 2, 3, 4, 5]
      let years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"]
      let yearSel = years[0]

      // Metric variable for function inputs
      let metric = "Rating"
      function metricMean(reviews, yearSel, metric) {
        // Initialize variables to increment
        let count = 0;
        let total = 0;
        
        // Loop through the array of reviews
        for (let i = 0; i < reviews.length; i++) {
          
          // Store the review at index `i` for evaluation
          let row = reviews[i];

          // Compare `rating` value to `rating` provided as argument
          if (row.Year_Month.includes(yearSel)){

            // Increment by `metric` argument value
            total += row[metric];
            // Increment by one
            count += 1
          }
        }
        
        // Calculate the average value
        let meanValue = total / count;

        // Return the calcuated average
        return meanValue;
      }

      // Invoke the metric average function
      // Calculate the average for each year individually
      let rArray = years.map(year => { 
          return metricMean(reviews, year, metric)
        })

      let plotYr;
      // console.log(rArray)

      let newData = [{
        x: years,
        y: rArray,
        type: "bar",
        marker: {
                color: '#ffc247'
              }
      }]

      let sortedCountries = summ.filter(country => (country.Reviews_Count < 50)).sort(function(country1, country2) {
       if (country1.Reviews_Count > country2.Reviews_Count) {
        return 1;
       }
       if (country1.Reviews_Count < country2.Reviews_Count) {
        return -1;
       }
       return 0;
      })

      let multipleReviews = sortedCountries.filter(country => (country.Reviews_Count > 1));

      let singleReviews = sortedCountries.filter(country => (country.Reviews_Count === 1)).sort(function(country1, country2) {
       if (country1.Avg_Rating > country2.Avg_Rating) {
        return 1;
       }
       if (country1.Avg_Rating < country2.Avg_Rating) {
        return -1;
       }
       return 0;
      });

      let plotCountries;
      // Consider changing the countries with average ratings plot to a bubble or scatter
      let countrySumm = [{
        name: 'Average Rating',
        x: multipleReviews.map(country => country.Reviewer_Location),
        y: multipleReviews.map(country => country.Avg_Rating),
        type: "bar",
        marker: {
                color: '#1893D6'
              }
      },
      {       
        name: 'Number of Reviews',
        x: multipleReviews.map(country => country.Reviewer_Location),
        y: multipleReviews.map(country => country.Reviews_Count),
        type: "bar",
        marker: {
                color: '#ffc247'
              }
      }]
    
      let plotSingles;
      let singleSumm = [{
        name: 'Average Rating',
        x: singleReviews.map(country => country.Reviewer_Location),
        y: singleReviews.map(country => country.Avg_Rating),
        type: "bar",
        marker: {
                color: '#47f0ff'
              }
      },
      {       
        name: 'Number of Reviews',
        x: singleReviews.map(country => country.Reviewer_Location),
        y: singleReviews.map(country => country.Reviews_Count),
        type: "bar",
        marker: {
                color: '#ff6b6b'
              }
      }]

    </script>

<h3>Total Reviews</h3>
<p>Total reviews in the dataset: {numReviews.toLocaleString()}</p>
<div id="plotly">
  <div bind:this={plotDiv}><!-- Plotly chart will be drawn inside this DIV -->
    </div>
    <div bind:this={plotYr}>
    </div>
</div>
<div>
  <div bind:this={plotSingles}>
  </div>
</div>
<div>
  <div bind:this={plotCountries}>
  </div>
</div>
<br />
<br />

<style>
  #plotly {
    display: flex;
    justify-content: space-around;
  }
</style>