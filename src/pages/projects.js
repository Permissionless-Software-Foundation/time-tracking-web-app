import React from 'react'
import Helmet from 'react-helmet'
/*import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"
import LogWorkForm from '../components/log-work-form'*/

import Layout from '../components/layout'


class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {


    const siteTitle = 'View Projects'

    return (
      <Layout loading="loading">
        <div className={`body`}>
          <Helmet title={siteTitle} />

          <section id="two" className="main style2">
            <div className="grid-wrapper">
              <div className="col-12">
                <center>
                  <h2>View Projects</h2>
                </center>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
/*
  // React Lifecycle - component has mounted.
  async componentDidMount() {
    
    if(!isLoggedIn()){ // for not loged user go to login
      navigate(`/login`)
    }
  }
  */
}

export default Projects