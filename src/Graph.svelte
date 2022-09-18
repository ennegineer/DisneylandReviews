<script>
    import {json, select} from 'd3'
    
    let reviews;
    let countries = [];
    let reviewsums = [];
    let currentCountry = 'United States';
    // currentRevSums is returning the object from reviewsums where the country matches the currently selected country
    $: currentRevSums = reviewsums.find((reviewsum) => {return reviewsum.Reviewer_Location == currentCountry});
    
    // use D3 to read in reviews.json
    json("./data/reviews.json").then(function (data) {
        reviews = data;
        console.log(reviews[0]);
    });
    
    // use D3 to read in summary.json
    json("./data/summary.json").then(function (summdata) {
        reviewsums = summdata;
    });
    
    
    // use D3 to read in countries.json
    json("./data/countries.json").then(function (countrydata) {
        countries = countrydata;
    });
    </script>
    
    <main>
        <h1>Disneyland Reviews</h1>
        <br />
        <p>
            Pick a reviewer location:
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
    </main>