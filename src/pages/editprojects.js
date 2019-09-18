import React from 'react'
import Helmet from 'react-helmet'
import { navigate } from "gatsby"
import { ensureAdmin } from "../services/auth"
import EditProjectsForm from '../components/Projects/project-select'

import Layout from '../components/layout'



class EditProjects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {


    const siteTitle = 'Edit Projects'

    return (
      <Layout loading="loading">
        <div className={`body`}>
          <Helmet title={siteTitle} />

          <section id="two" className="main style2">
            <div className="grid-wrapper">
              <div className="col-4" />
              <div className="col-4">
                <center>
                  <h2>EDIT PROJECTS</h2>
                  <EditProjectsForm />

                </center>
              </div>
              <div className="col-4" />
            </div>
          </section>
        </div>
      </Layout>
    )
  }

  // React Lifecycle - component has mounted.
  async componentDidMount() {
    // for non admin users , go back to home
    if (!ensureAdmin()) {
      navigate(`/`)
    }
  }
}

export default EditProjects
