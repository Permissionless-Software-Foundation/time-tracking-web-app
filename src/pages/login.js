import React from 'react'
import Helmet from 'react-helmet'
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

import LoginForm from '../components/login-form'
import Layout from '../components/layout'


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {


    const siteTitle = 'Login'

    return (
      <Layout loading="loading">
        <div className={`body`}>
          <Helmet title={siteTitle} />

          <section id="two" className="main style2">
            <div className="grid-wrapper">
              <div className="col-4" />
              <div className="col-4">
                <center>
                  <h2>Login</h2>
                  <LoginForm />
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
    // If user is already logged in, forward them to the private area.
    if (isLoggedIn()) {
      navigate(`/`)
    }
  }
}

export default Login
