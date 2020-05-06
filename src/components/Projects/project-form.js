/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { updateProject, newProject } from "../../services/projects";
import './project.css'

let _this

class ProjectForm extends React.Component {

  constructor(props) {
    super(props)

    _this = this

    this.state = {
      isNew: this.props.isNew,
      message: {
        type: '',
        msg: ''
      },
      project: {
        _id: this.props.project._id ? this.props.project._id : '',
        title: this.props.project.title ? this.props.project.title : '',
        projectLead: this.props.project.projectLead ? this.props.project.projectLead : '',
        briefContent: this.props.project.briefContent ? this.props.project.briefContent : '',
        extendedContent: this.props.project.extendedContent ? this.props.project.extendedContent : '',
        projectContact: this.props.project.projectContact ? this.props.project.projectContact : '',
        typesOfWork: this.props.project.typesOfWork ? this.props.project.typesOfWork : []
      },
      newType: false,
      typeWorkSelected: '',
      workToAdd: '',
    }

  }

  render() {
    return (
      <form >
        <h1>{_this.state.isNew}</h1> <br />
        Project Title:<br />
        <input type="text" name="title" value={this.state.project.title} onChange={this.handleUpdate} />
        <br />
        Project Lead:<br />
        <select className="selectProject" id="selectProjectLead" name="projectLead" onChange={this.handleUpdate}>
          <option value="">Select  Lead</option>
          {
            _this.props.users.map(val => <option value={val._id} key={val._id}>{val.username.toUpperCase()}</option>)
          }
        </select>
        <br />
        Description:<br />
        <textarea rows="3" name="briefContent" value={this.state.project.briefContent} onChange={this.handleUpdate} />
        <br />

        Project Contact:<br />
        <select className="selectProject" id="selectProjectContact" name="projectContact" onChange={this.handleUpdate}>
          <option value="">Select Contact</option>
          {
            _this.props.users.map(val => <option value={val._id} key={val._id}>{val.username.toUpperCase()}</option>)
          }
        </select>
        <br />
        Types of Work:<br />
        <div className="content-type">
          <select className="selectType" id="select" name="typeWorkSelected" onChange={this.handleUpdateWork}>
            <option value="">View Types of Work</option>
            {
              _this.state.project.typesOfWork.map(val => <option value={val} key={val}>{val}</option>)
            }
          </select>
          <button className="button special btn-type1 " id="newType" onClick={_this.state.typeWorkSelected ? this.deleteTypeWork : this.newTypeWork}>
            {_this.state.typeWorkSelected ? 'Delete' : 'New'}
          </button>
        </div>

        {

          (_this.state.newType && !_this.state.typeWorkSelected) &&
          <div>
            <input type="text" name="workToAdd" placeholder="Type of Work" onChange={this.handleUpdateWork} />
            <div className="content-type">
              <button className="button btn-type2" id="newType" onClick={this.newTypeWork}>
                Cancel
              </button>
              <button className="button special btn-type2" id="newType" onClick={this.addTypeWork}>
                Add
              </button>
            </div>

          </div>

        }
        {((_this.state.newType || _this.state.typeWorkSelected) && !this.state.isNew) && <p className="msg-war">The changes will be applied after clicking UPDATE PROJECT</p>}
        {((_this.state.newType || _this.state.typeWorkSelected) && this.state.isNew) && <p className="msg-war">The changes will be applied after clicking ADD PROJECT</p>}
        <br />
        <button href="#" className="button special btn-type3" id="addProjectBtn" onClick={this.state.isNew ? this.newProject : this.updateProject}>
          {this.state.isNew ? 'Add Project' : 'Update Project'}
        </button>
        <br />
        {this.state.message.type === 'ERR' ? <p className="msg-err">{this.state.message.msg}</p> :
          <p className="msg-suc">{this.state.message.msg}</p>}
      </form>

    )
  }
  // update form changes
  handleUpdate(event) {
    const name = event.target.name;
    const value = event.target.value
    _this.setState(prevState => ({
      ...prevState,
      project: {
        ...prevState.project,
        [name]: value
      }
    }))
    setTimeout(() => {
      console.log(_this.state)
    }, 500);
  }
  handleUpdateWork(event) {
    const name = event.target.name;
    const value = event.target.value
    _this.setState(prevState => ({
      ...prevState,
      [name]: value

    }))

  }
  // update message state
  msgUpdate(type, msg) {
    _this.setState({
      message: {
        msg,
        type,
      }
    })
  }
  componentDidMount() {

    if (!_this.state.isNew) {
      _this.componentDidUpdate(_this.props);
    }
  }
  componentDidUpdate(prevProps) {
    // update props  change in component update
    if (this.props.project._id !== prevProps.project._id)
      _this.msgUpdate('', '');
    if (this.props !== prevProps)
      this.setState({
        isNew: this.props.isNew,
        project: {
          _id: this.props.project._id ? this.props.project._id : '',
          title: this.props.project.title ? this.props.project.title : '',
          projectLead: this.props.project.projectLead ? this.props.project.projectLead : '',
          briefContent: this.props.project.briefContent ? this.props.project.briefContent : '',
          extendedContent: this.props.project.extendedContent ? this.props.project.extendedContent : '',
          projectContact: this.props.project.projectContact ? this.props.project.projectContact : '',
          typesOfWork: this.props.project.typesOfWork ? this.props.project.typesOfWork : [],
        }
      })
    const selectProjectLead = document.getElementById('selectProjectLead');
    selectProjectLead.value = _this.state.project.projectLead
    const selectProjectContact = document.getElementById('selectProjectContact');
    selectProjectContact.value = _this.state.project.projectContact
  }
  newTypeWork(event) {
    event.preventDefault();
    _this.setState({
      newType: _this.state.newType ? false : true,
    })
    setTimeout(() => {
      console.log(_this.state.newType)
    }, 300);
  }
  addTypeWork(event) {
    event.preventDefault();
    _this.setState({
      newType: false
    })
    const arr = _this.state.project.typesOfWork
    arr.push(_this.state.workToAdd)
    _this.setState(prevState => ({
      ...prevState,
      project: {
        ...prevState.project,
        typesOfWork: arr
      }
    }))

    setTimeout(() => {
      console.log(_this.state.project.typesOfWork)
    }, 300);
  }
  deleteTypeWork(event) {
    event.preventDefault();
    _this.setState({
      newType: false
    })
    const arr = _this.state.project.typesOfWork
    const index = arr.indexOf(_this.state.typeWorkSelected);
    if (index > -1) {
      arr.splice(index, 1);
    }
    _this.setState(prevState => ({
      ...prevState,
      project: {
        ...prevState.project,
        typesOfWork: arr,
      },
      typeWorkSelected: '',
      workToAdd: ''
    }))

    setTimeout(() => {
      console.log(_this.state)
    }, 500);
  }
  // function to add new Project
  async newProject(event) {
    event.preventDefault();
    if (!_this.validateForm())
      return;

    // send request
    const project = _this.state.project
    delete project['_id']
    const resp = await newProject(project);
    resp ? _this.msgUpdate('OK', 'Success!!') : _this.msgUpdate('ERR', 'ERR!!');
    // updating projects list  if resp is successful
    resp && _this.props.updateProjectList()


  }
  // function to update a Project
  async updateProject(event) {
    event.preventDefault();
    if (!_this.validateForm())
      return;

    // send request
    const project = _this.state.project
    const resp = await updateProject(project);
    resp ? _this.msgUpdate('OK', 'Success!!') : _this.msgUpdate('ERR', 'ERR!!');

    // updating projects list  if resp is successful
    resp && _this.props.updateProjectList()



  }
  // function to validate form
  validateForm() {
    if (!this.state.project.title) {
      _this.msgUpdate('ERR', 'Title Required.')
      return false;
    }
    return true;
  }
}

ProjectForm.propTypes = {
  project: PropTypes.object,
  users: PropTypes.array,
  isNew: PropTypes.bool,
  updateProjectList: PropTypes.func

}
export default ProjectForm