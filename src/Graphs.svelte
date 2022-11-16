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
          type: 'bar'
        }];
      
        onMount(() => {
              new Plotly.newPlot(plotDiv, data, {}, {showSendToCloud:true}); 
        });
        
    </script>

<h3>Total Reviews</h3>
<p>Total reviews in the dataset: {numReviews}</p>
<div id="plotly">
  <div bind:this={plotDiv}><!-- Plotly chart will be drawn inside this DIV -->
    </div>
</div>