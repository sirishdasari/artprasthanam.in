import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image";
// import { navigate } from 'gatsby-link'

import Layout from "../components/layout"
import Seo from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"
function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}
const ContactPage = ({ data }, location) => {

  const [state, setState] = React.useState({})
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch("https://getform.io/f/avrwngza", {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error))
  }

  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  return (
    <Layout title={siteTitle} social={social}>
      <Seo title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description} 
        image={data.markdownRemark.frontmatter.thumbnail.childImageSharp.gatsbyImageData.images.fallback.src}
        />
     
      <article className="contact-form page-template ">
      {submitted ? (
        <div className="thank-you-message">
          <h2>Thank you for your submission!</h2>
          <p>We will get back to you shortly.</p>
        </div>
      ) : (
        <>
          {data.markdownRemark.frontmatter.thumbnail && (
            <div className="post-content-image">
              <GatsbyImage
                image={getImage(data.markdownRemark.frontmatter.thumbnail)}
                className="kg-image"
                alt={data.markdownRemark.frontmatter.title} />
            </div>
          )}
          <div className="post-content-body">
            <p>
              Whether you're looking for personalized art pieces, unique gifts, or have any other inquiries, I'm here to help. I specialize in creating custom acrylic, texture, and pencil art tailored to your preferences. Feel free to reach out with your ideas, and let's bring your vision to life. I look forward to collaborating with you!
            </p>

            <h3 id="forms">Form</h3>
            <form 
              action="https://getform.io/f/avrwngza" 
              method="POST" 
              onSubmit={handleSubmit}
            >
              <div className="row gtr-uniform">
                <div className="col-6 col-12-xsmall">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="col-6 col-12-xsmall">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="col-12">
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Phone" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="col-12">
                  <textarea 
                    name="message" 
                    placeholder="Message" 
                    rows="6" 
                    onChange={handleChange} 
                    required 
                  ></textarea>
                </div>
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </>
      )}
      </article>



    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social{
          twitter
          facebook
        }
      }
    }
    markdownRemark(frontmatter: {templateKey: {eq: "contact-page"}}) {
      frontmatter {
        title
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
                    }
        }
      }
      
    }
  }
`

const ContactPageWrapper = (props) => (
  <StaticQuery
    query={indexQuery}
    render={(data) => (
      <ContactPage location={props.location} data={data} {...props} />
    )}
  />
);

export default ContactPageWrapper;
