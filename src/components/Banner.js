/* eslint-disable */

import React from 'react'
import { Link, navigate } from 'gatsby'
import { isLoggedIn } from "../services/auth";

const handleRouter = event => {

  event.target.name ? localStorage.setItem('routeTo', event.target.name) :
    localStorage.setItem('routeTo', null)

}
const Banner = props => (
  <section id="banner" className="major">
    <div className="inner">
      <header className="major">
        <h1>PSF Time Tracking</h1>
      </header>
      <div className="content">
        <p>
          This website allows participants in the{' '}
          <a href="https://psfoundation.cash" target="_blank">
            Permissionless Software Foundation
          </a>{' '}
          to track the time spent on projects. Tracking time allows participants
          to be reimbursed with PSF tokens.
        </p>

        <ul className="actions">
          <li>
            <Link name="logwork" onClick={handleRouter} className="button next scrolly" to={isLoggedIn() ? '/logwork' : '/login'}>Get Started</Link>
            { /*   <a href="/logwork" className="button next scrolly">
              Get Started
            </a>*/}
          </li>
        </ul>
      </div>
    </div>
  </section>
)


export default Banner
