<script>
    import countries from './assets/data/countries.json'
    import reviewsums from './assets/data/summary.json'
    
    let currentCountry = 'United States';
    // currentRevSums is returning the object from reviewsums where the country matches the currently selected country
    $: currentRevSums = reviewsums.find((reviewsum) => {return reviewsum.Reviewer_Location == currentCountry});
    
</script>

<h3>Project Summary</h3>
<p>
    The purpose of this project is to explore two datasets together to look for possible trends or correlations. The data used are Disneyland reviews from TripAdvisor, found on Kaggle, and data on crowd levels in the park and weather per day, scraped from touringplans.com.

    <br /><br /></p>
<h3>Reviews Summarized by Location</h3>
<p>
    Pick a reviewer's home country:
</p>

<form>
    <!-- svelte-ignore component-name-lowercase -->
    <select bind:value={currentCountry}>
        {#each countries as country}
            <option value={country}>
                {country}
            </option>
        {/each}
    </select>
</form>

<!-- country info -->
<p><strong>Reviewers from {currentCountry}</strong> give Disneyland <br>
a rating of {currentRevSums?.Avg_Rating.toFixed(2)} on average.<br>
{currentRevSums?.Reviews_Count.toLocaleString()} people from this country have left a review. <br></p>
