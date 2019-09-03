const replacePath = require('./utils')
const path = require('path')
const _ = require('lodash')
const getBaseUrl = require('../src/utils/getBaseUrl');
const languages = require('../src/data/languages')

module.exports = exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const postTemplate = path.resolve(`src/templates/postTemplate.js`)

  return new Promise((resolve, reject) => {
    // Create index pages for all supported languages
    Object.keys(languages.langs).forEach(langKey => {
      createPage({
        path: getBaseUrl(languages.defaultLangKey, langKey),
        component: postTemplate,
        context: {
          langKey,
        },
      });
    });

    // resolve(
    graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          // path: replacePath(`/${node.frontmatter.locale}${node.fields.slug}`),
          path: replacePath(node.fields.slug),
          component: postTemplate,
          context: {}, // additional data can be passed via context
        })
      })

      resolve()
    })
    // )
  })
  // return graphql(`
  //   {
  //     allMarkdownRemark(
  //       sort: { order: DESC, fields: [frontmatter___date] }
  //       limit: 1000
  //     ) {
  //       edges {
  //         node {
  //           fields {
  //             slug
  //             langKey
  //           }
  //           frontmatter {
  //             locale
  //             title
  //           }
  //         }
  //       }
  //     }
  //   }
  // `).then(result => {
  //   if (result.errors) {
  //     return Promise.reject(result.errors)
  //   }

  //   // _(result.data.allMarkdownRemark.edges)
  //   //   .groupBy('node.frontmatter.locale')
  //   //   .forOwn((postsInLocale, locale) => {
  //   //     console.log(locale);
  //   //     console.log(postsInLocale);
  //   //     // createPage({
  //   //     //   path: `/${locale}`,
  //   //     //   component: path.resolve(`src/templates/IndexPage.js`),
  //   //     //   layout: locale,
  //   //     //   context: {
  //   //     //     locale,
  //   //     //   },
  //   //     // })
  //   //   })

  //   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
  //     debugger;
  //     createPage({
  //       // path: replacePath(`/${node.frontmatter.locale}${node.fields.slug}`),
  //       path: replacePath(node.fields.slug),
  //       component: postTemplate,
  //       context: {}, // additional data can be passed via context
  //     })
  //   })
  // })
}
