import React from 'react'
import Helmet from 'react-helmet'
/*import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"
import LogWorkForm from '../components/log-work-form'*/
import WorksTable from '../components/works-table'
import { getLoggedworks, urlToGetLoggedworksCSV } from "../services/loggedworks";
import { getProjectById } from "../services/projects";
import Layout from '../components/layout'
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"
import styled from 'styled-components'

import CircularProgress from '@material-ui/core/CircularProgress';
let _this;

const StyledContainerIcon = styled.div`
display: flex;
justify-content: flex-end;
padding: 1em;
`
const StyledIcon = styled.i`
font-size:1em;
cursor:pointer;
margin-top: 1.2em;
margin-right: 1.2em;
`
class Reports extends React.Component {
  constructor(props) {
    super(props)

    _this = this
    this.state = {
      logworks: [],
      allLogworks: [],
      logworkToEdit: {},
      edit: false,
      paginatorNumber: 1,
      maxPage: 0,
      inFetch: false
    }

  }

  render() {

    // const classes = useStyles();
    const siteTitle = 'Reports'

    return (
      <Layout loading="loading">
        <div className={`body`}>
          <Helmet title={siteTitle} />

          <section id="two" className="main style2">
            <div className="grid-wrapper">
              <div className="col-12">
                <center>
                  <div className="grid-wrapper">
                    <div className="col-4">

                    </div>
                    <div className="col-4">
                      <h2 id="logWorkTitle">Work Reports</h2>

                    </div>
                    <StyledContainerIcon className="col-4" data-toggle="tooltip" data-placement="top" title={'EXPORT DATA'}>
                      <StyledIcon className="fa fa-download" aria-hidden="true" onClick={this.downloadLoggedworksCSV}></StyledIcon>
                    </StyledContainerIcon>
                  </div>
                  <WorksTable logworksList={_this.state.inFetch ? [] : _this.state.logworks} isEditable={false} back={this.previousPage} next={this.nextPage} maxPage={_this.state.inFetch ? 0 : _this.state.maxPage} currentPage={_this.state.paginatorNumber} />
                  {_this.state.inFetch && <div>
                    <CircularProgress />
                  </div>}
                </center>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
  async getlogWorks() {
    _this.inFetch(true)
    // send request
    const resp = await getLoggedworks();
    // for success response set projects to state else set message to state
    if (resp) {
      const maxPages = Math.ceil(resp.loggedWork.length / 25)
      const arraySorted = await _this.sortByTime(resp.loggedWork, resp.loggedWork.length);
      const logsworks = await _this.myCurrentPage(arraySorted, 1)

      console.log('break');
      _this.setState({
        logworks: logsworks,
        allLogworks: arraySorted,
        maxPage: maxPages
      })
      _this.inFetch(false)
      // for (let i = 0; i < myArr.length; i++) {
      //   const fetch = await getProjectById(myArr[i].project);
      //   myArr[i].projectTitle = (fetch && fetch.project && fetch.project.title) ? fetch.project.title : '';
      //   console.log(i);
      // }
    }
  }
  async downloadLoggedworksCSV(event) {
    event.preventDefault();
    console.warn("Downloading CVS")
    window.open(urlToGetLoggedworksCSV, '_blank');

  }
  async inFetch(val) {
    _this.setState({
      inFetch: val
    })
  }
  async myCurrentPage(arr, nPag) {

    let myArr = arr;
    if (arr.length > 25) {
      myArr = arr.slice((nPag - 1) * 25, (nPag) * 25);

    }
    for (let i = 0; i < myArr.length; i++) {
      const fetch = await getProjectById(myArr[i].project);
      myArr[i].projectTitle = (fetch && fetch.project && fetch.project.title) ? fetch.project.title : '';
    }
    return myArr;
  }
  async nextPage(event) {
    _this.inFetch(true)


    event.preventDefault();
    if (_this.state.paginatorNumber < _this.state.maxPage) {
      const arr = await _this.myCurrentPage(_this.state.allLogworks, _this.state.paginatorNumber + 1);
      _this.setState({
        paginatorNumber: _this.state.paginatorNumber + 1,
        logworks: arr
      })

    }
    _this.inFetch(false)

  }
  async previousPage(event) {
    _this.inFetch(true)

    event.preventDefault();
    if (_this.state.paginatorNumber > 1) {
      const arr = await _this.myCurrentPage(_this.state.allLogworks, _this.state.paginatorNumber - 1);
      _this.setState({
        paginatorNumber: _this.state.paginatorNumber - 1,
        logworks: arr
      })
    }
    _this.inFetch(false)


  }


  parseDate(date) {
    const dateString = date && date.toString() ? date.toString() : '';
    return dateString.slice(0, 10);
  }
  async getProjectsById(id) {

    // send request
    return await getProjectById(id);

  }
  async sortByTime(arr, max) { // array to sort by startTime , max of values to return

    const aux = arr.reverse().sort((a, b) => { // sort function
      if (a.startTime < b.startTime) {
        return 1;
      }
      if (a.startTime > b.startTime) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    let arr2 = [];
    aux.map((val, i) => {
      if (i < max) {
        arr2.push(val)
      }
      return 0
    })
    return arr2;
  }
  // React Lifecycle - component has mounted.
  async componentDidMount() {

    if (!isLoggedIn()) { // for not loged user go to login
      navigate(`/login`)
    }
    _this.getlogWorks();
  }
}
export default Reports