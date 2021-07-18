import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'


const RealisationsPage = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <Helmet title={`${title} - Réalisations`} />
    <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url('/img/blog-index.jpg')`,
      }}
    >
      <h1
        className="has-text-weight-bold is-size-1"
        style={{
          boxShadow: '0.5rem 0 0 #2b2523, -0.5rem 0 0 #2b2523',
          backgroundColor: '#2b2523',
          color: 'white',
          padding: '1rem',
        }}
      >
        Nos réalisations
      </h1>
    </div>
    <section className="section">
      <div className="container">
        <div className="content">
          <BlogRoll />
        </div>
      </div>
    </section>
  </Layout>
)

export default RealisationsPage

export const tagPageQuery = graphql`
  query RealisationsQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`