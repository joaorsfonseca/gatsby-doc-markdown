const languages = require('./src/data/languages');

module.exports = {
  siteMetadata: {
    title: 'Knowledge Base',
    languages
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    "gatsby-plugin-sass",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        name: "uploads",
        path: `${__dirname}/src/assets/img`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `MenuItems`, // a fixed string
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `menuItems`,
        path: `${__dirname}/src/menuItems`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/contents`,
        name: `pages`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-markdown',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/img/favicon.png'
        // icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-katex`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: 'post-toc-anchor',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 940,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {        
        langKeyDefault: languages.defaultLangKey,
        useLangKeyLayout: false, 
        // prefixDefault: true,
        pagesPaths: [`${__dirname}/contents/network/projects`],
        // markdownRemark: {
        //   postPage: 'src/templates/kb-post.js',
        //   query: `
        //   {
        //       allMarkdownRemark {
        //           edges {
        //           node {
        //               fields {
        //               slug,
        //               langKey
        //               }
        //           }
        //           }
        //       }
        //   }
        //   `
        // }
      }
    },
    `gatsby-plugin-remove-trailing-slashes`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `tags`, `section`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            slug: node => node.fields.slug, 
            section: node => node.frontmatter.section
          }
        },
        // Optional filter to limit indexed nodes
        // filter: (node, getNode) => node.frontmatter.tags !== "exempt"
      }
    },
  ],
  pathPrefix: '/kb',
}
