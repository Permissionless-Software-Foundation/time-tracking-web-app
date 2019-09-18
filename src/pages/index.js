/* eslint-disable */

import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/Banner'

//import pic01 from '../assets/images/pic01.jpg'
import pic02 from '../assets/images/pic02.jpg'
import pic03 from '../assets/images/pic03.jpg'
import pic04 from '../assets/images/pic04.jpg'
import pic05 from '../assets/images/pic05.jpg'
import pic06 from '../assets/images/pic06.jpg'

class HomeIndex extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet
          title="Time Tracking | Permissionless Software Foundation"
          meta={[
            { name: 'description', content: 'Track time for PSF projects.' },
            { name: 'keywords', content: 'psf, permissionless software foundation, time tracking' },
          ]}
        />

        <Banner />

      </Layout>
    )
  }
}

export default HomeIndex
