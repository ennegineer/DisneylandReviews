<script>
    import {json, select, sum} from 'd3'
    import { onMount } from 'svelte'
    import reviews from './assets/data/reviews.json'
    import Accordion, { createAccordionContext } from './Accordion.svelte'
    
    createAccordionContext()

    let numReviews = reviews.length;

    // Find the best and worst reviews
    function find_review(rating, isLongest){
      let reviewsByRating = reviews.filter(function(review) {
        return review.Rating == rating
      })
      reviewsByRating.sort(function(review1, review2) {
       if (review1.Review_Text.length > review2.Review_Text.length) {
        return 1;
       }
       if (review1.Review_Text.length < review2.Review_Text.length) {
        return -1;
       }
       return 0;
      })
      if (isLongest === true) {
        return reviewsByRating[reviewsByRating.length-1]}
      if (isLongest === false) {
        return reviewsByRating[0]}
    }
      let bestReview = find_review(5, true) // rating=5, longest review
      let bestShortReview = find_review(5, false) // rating=5, shortest review
      let worstReview = find_review(1, true) // rating=5, longest review
      let worstShortReview = find_review(1, false) // rating=5, shortest review


    // //   Accordion!
    //     var acc = document.getElementsByClassName("accordion");
    //     var i;

    //     for (i = 0; i < acc.length; i++) {
    //     acc[i].addEventListener("click", function() {
    //         /* Toggle between adding and removing the "active" class,
    //         to highlight the button that controls the panel */
    //         this.classList.toggle("active");

    //         /* Toggle between hiding and showing the active panel */
    //         var panel = this.nextElementSibling;
    //         if (panel.style.display === "block") {
    //         panel.style.display = "none";
    //         } else {
    //         panel.style.display = "block";
    //         }
    //     });
    //     }
    </script>

<h3>Total Reviews</h3>
<p>Total reviews in the dataset: {numReviews.toLocaleString()}</p>

<br />
<br />
<h3>Thoughts and Questions</h3>
<p>What were the best and worst reviews of Disneyland California during our recorded timeframe? The best review would be one of the more than 12,000 five-star reviews. How can we pick one as possibly the *best*? Let's consider that the best review might be the five-star review from the reviewer that had the most to say. Should we consider character count, or word count? What about the amount of exclamation marks, showing the reviewer's excitement about their park experience?<br /><br />
Let's apply that same logic for the worst Disneyland review. We can assume the worst review will be one of the nearly 500 one-star reviews - would it be from the person who had the most to say about their experience? What happens if we consider the amount of exclamation marks in a negative review?
<br /><br />
The longest reviews are certainly long, so they are tucked into the accordions below. Click to expand or hide the best and worst reviews below.
</p>

<Accordion>
    <div slot="head">
        <h2>Best Reviews</h2>
    </div>
    <div slot="details">
        <p>Here's our shortest 5-star review:<br /><br />
            Review ID:  {bestShortReview.Review_ID} <br />
            Rating:  {bestShortReview.Rating} <br />
            Review Date:  {bestShortReview.Year_Month} <br />
            Reviewer Location:  {bestShortReview.Reviewer_Location} <br />
            Review Text:  {bestShortReview.Review_Text} <br />
                
            <br /><br />   
            And here's our best review, assuming that the highest rated and longest written review is the best.
              <br /><br />
            Review ID:  {bestReview.Review_ID} <br />
            Rating:  {bestReview.Rating} <br />
            Review Date:  {bestReview.Year_Month} <br />
            Reviewer Location:  {bestReview.Reviewer_Location} <br />
            Review Text:  {bestReview.Review_Text} <br /></p>
    </div>
</Accordion>
<Accordion>
    <div slot="head">
        <h2>Worst Reviews</h2>
    </div>
    <div slot="details">
        <p>Here's our shortest 1-star review:<br /><br />
            Review ID:  {worstShortReview.Review_ID} <br />
            Rating:  {worstShortReview.Rating} <br />
            Review Date:  {worstShortReview.Year_Month} <br />
            Reviewer Location:  {worstShortReview.Reviewer_Location} <br />
            Review Text:  {worstShortReview.Review_Text} <br />
            <br />Uh oh. Maybe this reviewer entered the wrong number of stars??
            <br /><br />   
            And here's our worst review, assuming that the lowest rated and longest written review is the worst.
              <br /><br />
            Review ID:  {worstReview.Review_ID} <br />
            Rating:  {worstReview.Rating} <br />
            Review Date:  {worstReview.Year_Month} <br />
            Reviewer Location:  {worstReview.Reviewer_Location} <br />
            Review Text:  {worstReview.Review_Text} <br /></p>
    </div>
</Accordion>


<br /><br />

<style>
/* accordion style */
.accordion2 {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active, .accordion:hover {
  background-color: #ccc;
}

/* Style the accordion panel. Note: hidden by default */
.panel {
  padding: 0 18px;
  background-color: white;
  display: none;
  overflow: hidden;
}
</style>
