import React, { Fragment } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import SearchBox from '../SearchBox'

const Menu = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMenuItems {
            edges {
              node {
                link
                name
              }
            }
          }
          siteSearchIndex {
            index
          }
        }
      `}
      render={data => {
        const menuItems = data.allMenuItems.edges
          .map(edge => edge.node)
          .reverse()

        return (
          <Fragment>
            <SearchBox searchIndex={data.siteSearchIndex.index} />
            {menuItems.map(item => {
              return (
                <Link className="navbar-item" key={item.name} to={item.link}>
                  {item.name}
                </Link>
              )
            })}
          </Fragment>
        )
      }}
    />
  )
}

export default Menu
