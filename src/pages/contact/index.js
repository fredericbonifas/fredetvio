import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from '../../components/Layout'


const ContactPage = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
  <Helmet title={`${title} - Contact`} />
    <section className="section">
      <div className="container">
        <div className="content">
          <h1>Téléphone</h1>
          <p>06 72 65 28 07</p>
          <h1>Email</h1>
          <p>fredetvio.atelier@gmail.com</p>
        </div>
      </div>
    </section>
  </Layout>
)

export default ContactPage

export const tagPageQuery = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`