import React from 'react'
import Helmet from 'react-helmet'
import { navigate } from "gatsby"
import { isLoggedIn , getUser } from "../services/auth"
import LogWorkForm from '../components/log-work-form'
import WorksTable from '../components/works-table'
import { getLoggedworks } from "../services/loggedworks";
import { getProjectById } from "../services/projects";

import Layout from '../components/layout'


let _this
class LogWork extends React.Component {
  constructor(props) {
    super(props)
    _this = this
    this.state = {
      logworks: [],
      logworkToEdit: {},
      edit:false
    }
  }

  render() {


    const siteTitle = 'Log Work'

    return (
      <Layout loading="loading">
        <div className={`body`}>
          <Helmet title={siteTitle} />

          <section id="two" className="main style2">
            <div className="grid-wrapper">
              <div className="col-12">
                <center>
                  <h2 id="logWorkTitle">Log Work</h2>
                  <LogWorkForm updateTable={this.getlogWorks} isEdit={_this.state.edit} logWorkToEdit={_this.state.logworkToEdit} isNewFnc={_this.isNewForm}/>
                  <h3>This table shows the last 5 work entries, based on date</h3>
                  <WorksTable logworksList={_this.state.logworks}  editLogWork={this.editLogWork} isEditable={true} />

                </center>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
  async getlogWorks() {

    // send request
    const resp = await getLoggedworks();
    // for success response set projects to state else set message to state
    if (resp) {
      const username =getUser().username;
      const logs = [];
      for (let i = 0; i < resp.loggedWork.length; i++) {
        if(resp.loggedWork[i].user === username){
        logs.push(resp.loggedWork[i])
      }
      }
      const logsworks = await _this.sortByTime(logs, 5);
      for (let i = 0; i < logsworks.length; i++) {
        const fetch = await getProjectById(logsworks[i].project);
        logsworks[i].projectTitle = (fetch && fetch.project && fetch.project.title) ? fetch.project.title : '';

      }

      _this.setState({
        logworks: logsworks
      })
    }
  }
  async editLogWork(logwork) {
    logwork.startTime = _this.parseDate(logwork.startTime);
    _this.setState({
      logworkToEdit: logwork,
      edit:true
    })
    setTimeout(()=> document.getElementById('logWorkTitle').scrollIntoView({behavior: 'smooth'}),300);

  }
  async isNewForm(){
    _this.setState({
      edit:false
    })
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

export default LogWork