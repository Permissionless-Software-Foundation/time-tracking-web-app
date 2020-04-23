/* eslint-disable */

import React from 'react'
import { getProjects } from "../../services/projects";
import { getUsers } from "../../services/users";

import ProjectForm from './project-form' 

import  './project.css'




let _this

class EditProjectsForm extends React.Component {

  constructor(props) {
    super(props)

    _this = this

    this.state = {
      projects: [],
      projectSelectedIndex: '',
      addNewProject: false,
      users: [],
    }
    this.getProjects = this.getProjects.bind(this)
  }

  render() {
    return (
      <div className="projects-container">
        <div >
          <select className="button fit styledSelect" id="select" name="projectSelectedIndex" onChange={this.handleUpdate} >
            <option value="" >Select Project</option>
            {
              this.state.projects.map((value, i) => <option value={i} key={value._id}> {value.title} </option>)
            }
          </select>
          <button onClick={this.addNew} id="addNewProject" href="#" className="button special btn-type3}" >
            Add New Project
        </button>
        </div>
        {this.state.projectSelectedIndex && !this.state.addNewProject ?
          <div>
            <h2>UPDATE PROJECT</h2>
            <ProjectForm project={_this.state.projects[_this.state.projectSelectedIndex]} isNew={_this.state.addNewProject} updateProjectList={this.getProjects} users={_this.state.users}/>
          </div>
          : this.state.addNewProject ?
            <div>
              <h2>ADD NEW PROJECT</h2>
              <ProjectForm project={{}} isNew={_this.state.addNewProject} updateProjectList={this.getProjects} users={_this.state.users} />
            </div>
            : null}
      </div>

    )
  }

  handleUpdate(event) {
    _this.setState({
      addNewProject: false,
      [event.target.name]: event.target.value,
    })

  }
  addNew() {
    _this.setState({
      addNewProject: true,
      projectSelectedIndex: 0
    })
    
    const mySelect = document.getElementById("select"); // get selected element
    mySelect.selectedIndex = 0;  // set selected index to 0
  }
  async getProjects() {

    // send request
    const resp = await getProjects();
    console.log(resp);
    // if successful, send projects to state, else set message to state
    if (resp) {
      _this.setState({
        projects: resp.projects
      })
    } 



  }
  async getUsersList() {

    // send request
    const resp = await getUsers();
    console.warn('users');
    console.log(resp);
    // if successful, send projects to state, else set message to state
    if (resp) {
      _this.setState({
        users: resp.users
      })
    } 



  }


  // React Lifecycle - component has mounted.
  async componentDidMount() {
    _this.getProjects();
    _this.getUsersList();
  }


}

export default EditProjectsForm
