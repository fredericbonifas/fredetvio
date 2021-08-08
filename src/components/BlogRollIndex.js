import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"


class BlogRollIndex extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article className="blog-list-item tile is-child box notification">
                <p className="post-meta is-parent column is-12">
                  <Link
                    className="title has-text-primary is-size-4"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
                </p>
                <p className="column project-meta">
                  {post.frontmatter.place}<br />
                  {post.frontmatter.date}
                </p>
                {post.frontmatter.featuredimage ? (
                  <p className="featured-thumbnail is-parent column is-12">
                    <GatsbyImage image={getImage(post.frontmatter.featuredimage)} alt={`featured image thumbnail for post ${post.frontmatter.title}`} />
                  </p>
                ) : null}
                <p>
                  <Link className="button" to={post.fields.slug}>
                    En savoir plus →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

BlogRollIndex.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollIndexQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          limit: 2
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "YYYY")
                place
                featuredimage {
                  childImageSharp {
                    gatsbyImageData(
                      width: 500
                      height: 500
                      placeholder: BLURRED
                      transformOptions: {fit: COVER, cropFocus: CENTER}
                    )
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRollIndex data={data} count={count} />}
  />
)
