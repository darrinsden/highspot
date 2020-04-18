## SPECIFIC INSTALL NOTES
Since I am unsure what you may be running this on
(and the fact that i am running a beta OS)

I wanted to include a few install notes that i went through
this may not be necessary at all

xcode-select --install
via:
https://ma.ttias.be/mac-os-xcrun-error-invalid-active-developer-path-missing-xcrun/

sudo npm install npm -g
npm install -g n
sudo n stable

npm install react-infinite-scroller --save
nom install quest --save

- - - -

## HIGHSPOT SPECIFIC NOTES
I decided to use react (gatsby) as i was most recently familiar with it

download zip (or clone) from
	https://github.com/darrinsden/highspot

### In terminal
	cd gatsby-site
	npm install
	gatsby develop

### point browser to
	http://localhost:8000

### Observations
Search took a bit as it wasn’t returning what i wanted, modified it a number of different ways.. 
	see TODO for issue
	including passing the results to a new page.
		I didnt like that one though and rejected after a bit

Am not spending a super amount of time with design, as the functionality is more important on this.  And used to working with a designer on it, it becomes wasted work as the designs dont align.  As colors are so very much an opinion, I tend to keep things in greyscales at first.

Uploading to github took the longest time though.  as I had some stray existing .git files in directories that were not getting added to the repo

- - - -

### browser media queries
	* displays 4 cards per row by default
	* 3 cards at 1200px browser width
	* 2 at 800px
	* 1 at 500px

### Design TODOS: (suggestions)
    * TODO: Add some sort of graphical header to create a bit more impact
	* TODO: Add a modal to the cards to display full information OR take them to a new page with that info for the particular card
	* TODO: HEADER & SEARCH should stay fixed at the top of the screen possibly have the search as part of the header
	* TODO: loading indicator should be absolutely positioned rather than at bottom of list
    * TODO: Possibly employ progressive image techniquies to load the image onto the page

### Dev TODOS:
	* TODO: move search section into its own component
    * TODO: move card list into its own component

    rather have the page itself super light and then include the components as needed

### Bug TODOS:
	* TODO: search is a touch wonky.. for some reason if a search is returned that is a small number of results, they don’t display

### General Considerations:
    * The page may slow down if the data set is much larger... I have not noticed a slowdown, but as more stuff is added to the page, it will happen.
    Suggestion is to perhaps remove ites form the top of the list as you scroll down, and then to add items as you scroll up.  This also lends to the approach of have a search theat is always in view.