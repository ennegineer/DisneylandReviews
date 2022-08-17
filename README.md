# Disneyland Reviews
Revisiting the DisneyETL project.

[See the original project here!](https://github.com/ennegineer/DisneyETL)

## Background: the original project
In the original repository, Sally and I decided on Disneyland reviews as our dataset for an ETL project. We found a dataset on Kaggle and filtered the data by park (we wanted to only consider reviews for Disneyland California) and removed duplicate entries. We then found a website that tracks the high and low temperatures as well as the crowd level in the park daily. I wrote a script to scrape this data from the website from 9/1/2014 through 4/30/2019 using `beautifulsoup` and save it to csv for later use.

Our original findings were lackluster. We had hoped to find a correlation between reviews and crowd level (assumption: a crowded park may lead to a less than ideal experience). However, the reviews data from Kaggle gives only the month/year for the review date. Without knowing the actual date of the visit in review, we cannot compare the reviews to the crowd level for that day. Aggregating the crowd levels into months becomes meaningless.

## Goals for this project revisit

- **Exercise that ETL muscle.**
- **Practice Javascript.** 
- **Look for patterns in the data.**
- **Learn a framework.** 

### Steps to complete the goals

**ETL**
*Extract*: As much as I really really want to do more webscraping for this project, I'm temporarily stuck. I have searched Kaggle for the Disneyland reviews data again, and I am only finding the same dataset with the review dates limited to month/year. I searched on TripAdvisor but am unable to successfully search for the data I want to even be able to write a script to scrape it. Going back to the site used to write the initial scraping script would require once again paying for access to their data - but I believe I scraped all I need from that site already.

So for now, the extent of extracting for this project is to grab the previously sourced Disneyland reviews dataset, and the output from the webscraping code I wrote a few months ago for the joint project with Sally.

*Transform*: Our project files got a bit muddy, so I put the DisneyReviews.csv in this repository in the data folder, and created a Python notebook `transform.ipynb` to start the process over. I dropped the other Disneyland locations in Excel before saving the file to this repo to save on diskspace. Unsure how I will be able to work with dates in javascript, I created a new column using `to_datetime()` - maybe this is unnecessary, but it's one step up front to potentially save me from having to go back to the notebook and re-export the data to json later. Next, I dropped duplicates, then dropped the column containing the branch name, then exported the transformed data to json.

Also in this notebook, I created two additional json files from the dataframe. The first is a list of unique countries from the `Reviewer_Location` column, and the second is a summary table of the average rating and total count of reviews by country.

*Load*: The quickest part, in this case! The json files created in the previous step are all saved in the data folder in this repo, and read into the javascript file using d3. This was iterative at first; as I was setting up the html/js to pull in the data in an interactive way, I decided to have a dropdown to allow the end user to select a country. I realized I had to go back to my notebook to create the two additional json files to make the task easier to handle.  

**Javascript**
First, I am setting up a rather barebones webpage to get more experience with rendering interactive data. I really love flask for this purpose but that is exactly why I'm using javascript here. Practice the thing I don't like until I get good at it??

**Look for Patterns**
As I begin pulling more of the data onto the page, I'll build some visualizations. From there, we'll look for patterns or correlations and start to come up with an analysis.

**Learn a Framework**
I'm sure I will not get through all of the above goals linearly, so at some point before I'm finished with everything else, I want to learn a js framework so I can have components across multiple pages. The most apparent use case here is for navigation. 


