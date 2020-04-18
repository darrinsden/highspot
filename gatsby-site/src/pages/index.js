import React, { Component } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

// page specific css
import "../components/highspot.css"

// import of externernal packages
import InfiniteScroll from "react-infinite-scroller"
import qwest from "qwest"

const api = {
  baseUrl: "https://api.elderscrollslegends.io/v1/cards",
  pageSize: 20,
  searchTerm: "",
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: [],
      hasMoreItems: true,
      nextHref: null
    }
  }
 
  handleChange(event) {
    // TODO: why is setState not working for me in this instance?
    // this.setState({searchTerm: event.target.value});
    api.searchTerm = event.target.value;
  }

  loadItems() {
    var self = this;
    var url =
      api.baseUrl + "?pageSize=" + api.pageSize + "&name=" + api.searchTerm;

    if (this.state.nextHref) {
      url = this.state.nextHref 
    }
    
    // grabs first x number of cards from API
    // and adds them to a cards array in state
    qwest.get(url).then(function (xhr, resp) {
      if (resp) {
        var cards = self.state.cards

        for (var i in resp.cards) {
          cards.push([i, resp.cards[i]])
        }

        if (resp._links.next) {
          self.setState({
            cards: cards,
            nextHref: resp._links.next,
          })
        } else {
          self.setState({
            hasMoreItems: false,
          })
        }
      }  
    })
  }

  // TODO: BUG: search is a touch wonky.. for some reason if a search is returned that is a small number of results, they don’t display
  searchCardList() {
    this.setState({
      cards: [],
      hasMoreItems: true,
      nextHref: null
    })
  }
  
  render() {
    let loader = (
      <div className="overlay" key={0}>
        <div className="overlay__inner">
          <div className="overlay__content">
            <span className="spinner"></span>
          </div>
        </div>
      </div>
    )

    // builds up a list of the cards html to add to the display
    var items = [];
    this.state.cards.map((card, i) => {
      items.push(
        <article className="card" key={i}>
          <div className="image-container">
            <img src={card[1].imageUrl} width="150" alt={card[1].name}/>
          </div>
          <div className="text-container">
            <div className="small">
              <span>Name:</span> {card[1].name}
            </div>
            <div className="small">
              <span>Text:</span> {card[1].text}
            </div>
            <div className="small">
              <span>Set Name:</span> {card[1].set.name}
            </div>
            <div className="small">
              <span>Type:</span> {card[1].type}
            </div>
          </div>
        </article>
      )
    })
    

    // TODO: move search section into its own component
    // TODO: move card list into its own component

    // SUGGESTION: HEADER & SEARCH should stay fixed at the top of the screen
    // SUGGESTION: Add some sort of graphical header to create a bit more impact
    // SUGGESTION: Add a modal to the cards to display full information OR take them to a new page with that info for the particular card
    // SUGGESTION: HEADER & SEARCH should stay fixed at the top of the screen possibly have the search as part of the header
    // SUGGESTION: loading indicator should be absolutely positioned rather than at bottom of list
    // SUGGESTION: Possibly employ progressive image techniquies to load the image onto the page


    return (
      <Layout>
        <SEO title="Highspot coding exercise" />
        <div className="searchbar">
          <div className="left">Search the card list</div>
          <div className="right">
            <input type="text" onChange={this.handleChange} />
            <button onClick={this.searchCardList.bind(this)}>Search</button>
          </div>
        </div>

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={loader}
        >
          <section className="card-container">{items}</section>
        </InfiniteScroll>

        {!this.state.hasMoreItems && 
          <div className="finished">
            No more items to retrieve
          </div>
        }
      </Layout>
    )
  }
}

export default App
