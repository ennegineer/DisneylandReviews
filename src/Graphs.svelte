<script>
    import Plotly from 'plotly.js-dist-min'
    import {json, select, sum} from 'd3'
    import { onMount } from 'svelte'
    import reviews from './assets/data/reviews.json'
        
      let numReviews = reviews.length;
      let R1 = reviews.filter( element => element.Rating == 1)
      let R2 = reviews.filter( element => element.Rating == 2)
      let R3 = reviews.filter( element => element.Rating == 3)
      let R4 = reviews.filter( element => element.Rating == 4)
      let R5 = reviews.filter( element => element.Rating == 5)

      let plotDiv;
    
      let data = [{
        x: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        y: [R1.length, R2.length, R3.length, R4.length, R5.length],
        type: 'bar',
        marker: {
                color: '#f33bbc'
              }
      }];
    
      onMount(() => {
            new Plotly.newPlot(plotDiv, data, {
              width: 500, 
              height: 400, 
              title: "Total reviews per rating",
              paper_bgcolor: '#3a3a3a',
              plot_bgcolor: '#d1d1d1',
              font: {
                color: '#47daff'
              }}, {showSendToCloud:true}); 
            new Plotly.newPlot(plotYr, newData, {
              width: 500,
              height: 400,
              title: "Average rating per year",
              paper_bgcolor: '#3a3a3a',
              plot_bgcolor: '#d1d1d1',
              font: {
                color: '#47daff'
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
      console.log(rArray)

      let newData = [{
        x: years,
        y: rArray,
        type: "bar",
        marker: {
                color: '#f33bbc'
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

<style>
  #plotly {
    display: flex;
    justify-content: space-around;
  }
</style>

<!-- US vs. rest of the world averages -->