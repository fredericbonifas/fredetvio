import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

import Gallery from '@browniebroke/gatsby-image-gallery'


export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  helmet,
  pictures,
  images,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <PostContent content={content} />
            {pictures && pictures.blurbs && pictures.blurbs.length ? (
              <Gallery images={images} />
            ) : null}
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Catégories</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
  pictures: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  const images =   post.frontmatter.pictures && post.frontmatter.pictures.blurbs && post.frontmatter.pictures.blurbs.length ? (
    post.frontmatter.pictures.blurbs.map(({ image }) => image.childImageSharp)
  ) : null

  return (
    <Layout>
      <Helmet title={`${data.site.siteMetadata.title} - ${post.frontmatter.title}`} />
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        pictures={post.frontmatter.pictures}
        images={images}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        pictures {
          blurbs {
            image {
              childImageSharp {
                thumb: gatsbyImageData(
                  width: 270
                  height: 270
                  placeholder: BLURRED
                  transformOptions: {fit: COVER, cropFocus: CENTER}
                )
                full: gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
`
