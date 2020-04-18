
<!-- HIGHSPOT SPECIFIC NOTES:START -->
decided to use react (gatsby) as i was most recently familiar with it

step 1 was to find a infinite scroll package for react rather than create a new one from scratch

In terminal
cd gatsby-site
gatsby develop

point browser to
http://localhost:8000

search took a bit as it wasnt returning what i wanted, modified it a number of different ways.. including passing the results to a new page
  I didnt like that one though

browser media queries
  displays 4 cards per row by default
  3 cards at 1200px browser width
  2 at 800px
  1 at 500px

TODO: Add a modal to the cards to display full information
    OR take them to a new page with that info for the particular card
TODO: HEADER & SEARCH should stay fixed at the top of the screen
  possibly have the search as part of the header
TODO: loading indicator should be absolutely positioned rather than at bottom of list

TODO: move search section into its own component
TODO: BUG:  search is a touch wonkey..  for some reason if a search is returned that is a small number of results, they dont display



<!-- HIGHSPOT SPECIFIC NOTES:END -->