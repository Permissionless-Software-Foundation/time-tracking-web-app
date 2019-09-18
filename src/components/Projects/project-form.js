import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { updateProject, newProject } from "../../services/projects";



const StyledButton = styled.a`
  margin: 10px;
  margin-bottom: 25px;
`
const StyledButton2 = styled.button`
  margin-bottom: 25px;
  width:30%;
`
const StyledButton3 = styled.button`
margin-top: 5px;
  margin-bottom: 25px;
  width:50%;
`
const StyledContentTypes = styled.div`
display:flex
`

const OutMsgError = styled.p`
  color: red;
  font-weight: bold;
  size: 18px;
`
const OutMsgWarning = styled.p`
  color: #ffae42;
  font-weight: bold;
  size: 18px;
`
const OutMsgSuccess = styled.p`
  color: green;
  font-weight: bold;
  size: 18px;
`
const StyledSelect = styled.select`
  width:69%;
  margin-right:1%;
  justify-content: flex-start;
  margin-bottom: 25px;
  -webkit-appearance: menulist;
`
const StyledSelect2 = styled.select`
  margin-bottom: 25px;
  -webkit-appearance: menulist;
`
const StyledOption = styled.option`
  margin: 5px;
  color: black;
  `
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
        <StyledSelect2 id="selectProjectLead" name="projectLead" onChange={this.handleUpdate}>
          <StyledOption value="">Select  Lead</StyledOption>
          {
            _this.props.users.map(val =><StyledOption value={val._id} key={val._id}>{val.username.toUpperCase()}</StyledOption>)
            }
        </StyledSelect2>
        <br />
        Description:<br />
        <textarea  rows="3"  name="briefContent" value={this.state.project.briefContent} onChange={this.handleUpdate} />
        <br />

        Project Contact:<br />
        <StyledSelect2 id="selectProjectContact" name="projectContact" onChange={this.handleUpdate}>
          <StyledOption value="">Select Contact</StyledOption>
          {
            _this.props.users.map(val =><StyledOption value={val._id} key={val._id}>{val.username.toUpperCase()}</StyledOption>)
            }
        </StyledSelect2>
        <br />
        Types of Work:<br />
        <StyledContentTypes>
          <StyledSelect id="select" name="typeWorkSelected" onChange={this.handleUpdateWork}>
            <StyledOption value="">View Types of Work</StyledOption>
            {
              _this.state.project.typesOfWork.map(val => <StyledOption value={val} key={val}>{val}</StyledOption>)
            }
          </StyledSelect>
          <StyledButton2 className="button special" id="newType" onClick={_this.state.typeWorkSelected ? this.deleteTypeWork : this.newTypeWork}>
            {_this.state.typeWorkSelected ? 'Delete' : 'New'}
          </StyledButton2>
        </StyledContentTypes>

        {

          (_this.state.newType && !_this.state.typeWorkSelected) &&
          <div>
            <input type="text" name="workToAdd" placeholder="Type of Work" onChange={this.handleUpdateWork} />
            <StyledContentTypes>
              <StyledButton3 className="button " id="newType" onClick={this.newTypeWork}>
                Cancel
</StyledButton3>
              <StyledButton3 className="button special" id="newType" onClick={this.addTypeWork}>
                Add
</StyledButton3>
            </StyledContentTypes>

          </div>

        }
         {((_this.state.newType || _this.state.typeWorkSelected)&& !this.state.isNew)&& <OutMsgWarning>The changes will be applied after clicking UPDATE PROJECT</OutMsgWarning> }
         {((_this.state.newType || _this.state.typeWorkSelected)&& this.state.isNew)&& <OutMsgWarning>The changes will be applied after clicking ADD PROJECT</OutMsgWarning> }
        <br />
        <StyledButton href="#" className="button special" id="addProjectBtn" onClick={this.state.isNew ? this.newProject : this.updateProject}>
          {this.state.isNew ? 'Add Project' : 'Update Project'}
        </StyledButton>
        <br />
        {this.state.message.type === 'ERR' ? <OutMsgError>{this.state.message.msg}</OutMsgError> :
          <OutMsgSuccess>{this.state.message.msg}</OutMsgSuccess>}
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