import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Menu from '../Menu';

const Header = ({toggleNavbar, isActive}) => (
  <StaticQuery
    query={graphql`
            query SearchIndexQuery {
                siteSearchIndex {
                    index
                }
                site {
                  siteMetadata {
                    title
                  }
                }
            }
        `}
    render={data => (
      <nav className='navbar is-fixed-top' aria-label='main navigation'>
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            <strong>{data.site.siteMetadata.title}</strong>
          </Link>
          <button
            className={`button navbar-burger ${isActive ? 'is-active' : ''}`}
            data-target='navMenu'
            onClick={toggleNavbar}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`} id='navMenu'>
          <div className='navbar-end'>
            <Menu />
          </div>
        </div>
      </nav>
    )}
  />
)

export default Header
