import React from 'react'
import styled from 'styled-components'
import { getProjects } from "../../services/projects";
import { getUsers } from "../../services/users";

import ProjectForm from './project-form'



const StyledButton = styled.a`
  margin: 10px;
  margin-bottom: 25px;
`

const StyledSelect = styled.select`
  margin: 10px;
  margin-bottom: 25px;
`
const StyledOption = styled.option`
  margin: 5px;
  color: black;
  font-size: 16px;
`
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
      <div>
        <div >
          <StyledSelect className="button fit" id="select" name="projectSelectedIndex" onChange={this.handleUpdate} >
            <StyledOption value="" >Select Project</StyledOption>
            {
              this.state.projects.map((value, i) => <StyledOption value={i} key={value._id}> {value.title} </StyledOption>)
            }
          </StyledSelect>
          <StyledButton onClick={this.addNew} id="addNewProject" href="#" className="button special" >
            Add New Project
        </StyledButton>
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
