import React, { Component } from "react"

// import of external packages
import InfiniteScroll from "react-infinite-scroller"
import qwest from "qwest"

const api = {
  baseUrl: "https://api.elderscrollslegends.io/v1/cards",
  pageSize: 20,
  searchTerm: "",
}

class CardList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: [],
      hasMoreItems: true,
      nextHref: null
    }
  }

  handleChange = (event) => {
    // TODO: why is setState not working for me in this instance?
    // actaully got it working, but reverted it as it broke search
    api.searchTerm = event.target.value
  }

  loadItems() {
    var self = this
    var url =
      api.baseUrl + "?pageSize=" + api.pageSize + "&name=" + api.searchTerm

    if (this.state.nextHref) {
      url = this.state.nextHref
    }

    // grabs first x number of cards from API
    // and adds them to a cards array in state
    qwest
      .get(url)
      .then(function (xhr, resp) {
        if (resp) {
          var cards = self.state.cards

          for (var i in resp.cards) {
            cards.push([i, resp.cards[i]])
          }

          if (resp._links && resp._links.next) {
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
      .catch(function (e, xhr, response) {
        // TODO: display a error message to the user
        console.log(e)
      })
  }

  searchCardList() {
    this.initializeState();
  }

  clearSearch() {
    api.searchTerm = "";
    var input = document.getElementById("search");
    input.value = "";
    this.initializeState();
  }

  initializeState() {
    this.setState({
      cards: [],
      hasMoreItems: true,
      nextHref: null,
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
    var items = []
    this.state.cards.map((card, i) => {
      items.push(
        <article className="card" key={i}>
          <div className="image-container">
            <img src={card[1].imageUrl} width="150" alt={card[1].name} />
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
    return (
      <>
        <div className="searchbar">
          <div className="left">Search the card list</div>
          <div className="right">
            <input
              type="text"
              name="search"
              id="search"
              onChange={this.handleChange}
            />
            <button onClick={this.searchCardList.bind(this)}>Search</button>
            <button onClick={this.clearSearch.bind(this)}>Clear</button>
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

        {!this.state.hasMoreItems && (
          <div className="finished">No more items to retrieve</div>
        )}
      </>
    )
  }
}

export default CardList
