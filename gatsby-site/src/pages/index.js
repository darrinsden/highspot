import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

// page specific css
import "../components/highspot.css"

// page specific component
import CardList from "../components/cardList"

// SUGGESTION: HEADER & SEARCH should stay fixed at the top of the screen
// SUGGESTION: Add some sort of graphical header to create a bit more impact
// SUGGESTION: Add a modal to the cards to display full information OR take them to a new page with that info for the particular card
// SUGGESTION: HEADER & SEARCH should stay fixed at the top of the screen possibly have the search as part of the header
// SUGGESTION: loading indicator should be absolutely positioned rather than at bottom of list
// SUGGESTION: Possibly employ progressive image techniquies to load the image onto the page
// SUGGESTION: Add some sort of filtering to the list.. enhanced search

const Main = () => (
  <Layout>
    <SEO title="Highspot coding exercise" />
    <CardList />
  </Layout>
)

export default Main
