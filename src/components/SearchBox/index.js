import React, { Component, Fragment } from 'react'
import { Link } from 'gatsby'
import { Index } from 'elasticlunr'

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
      isActive: false,
    }
  }

  render() {
    return (
      <div className={`navbar-item ${this.state.isActive ? 'is-active' : ''}`}>
        <input
          className="input navbar-link is-rounded is-primary"
          type="text"
          value={this.state.query}
          onChange={this.search}
          placeholder="Search"
        />
        <div className="navbar-dropdown">
          {this.state.results
            ? this.state.results.map(item => (
                <Fragment key={item.section}>
                  <h1>{item.section}</h1>
                  {item.list
                    ? item.list.map(each => (
                        <Link
                          className="navbar-item"
                          key={each.id}
                          to={each.slug}
                        >
                          {each.title}
                        </Link>
                      ))
                    : null}
                </Fragment>
              ))
            : null}
        </div>
      </div>
    )
  }

  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()

    const results = []
    // Query the index with search string to get an [] of IDs
    this.index
      .search(query, { expand: true }) // Accept partial matches
      // Map over each ID and return the full document
      .map(({ ref }) => {
        // Get doc by ref
        const doc = this.index.documentStore.getDoc(ref)
        results.push(doc)
      })

    let group = []
    results.forEach(function(item) {
      const prev = group.find(x => x.section == item.section)

      if (prev) {
        prev.list.push(item)
      } else {
        group.push({ section: item.section, list: [item] })
      }
    })

    this.setState({
      query,
      results: group,
      isActive: !!query,
    })
  }
}
