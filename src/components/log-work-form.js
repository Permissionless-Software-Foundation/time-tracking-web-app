import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { newLogWork, updateLoggedWork } from "../services/loggedworks";
import { getProjects } from "../services/projects";
import { getUser } from "../services/auth"
//import { timingSafeEqual } from 'crypto';


const StyledButton = styled.a`
  margin: 10px;
  margin-bottom: 25px;
`
const StyledForm = styled.form`
 padding:20px;
`

const OutMsgError = styled.p`
  color: red;
  font-weight: bold;
  size: 18px;
`
const OutMsgSuccess = styled.p`
  color: green;
  font-weight: bold;
  size: 18px;
`
const StyledSelect = styled.select`
  margin: 10px;
  margin-bottom: 25px;
`
const StyledInput = styled.input`
-webkit-appearance: none;
-ms-appearance: none;
appearance: none;
background: rgba(212, 212, 255, 0.035);
border: none;
border-radius: 0;
color: inherit;
display: block;
outline: 0;
padding: 0 1em;
text-decoration: none;
width: 100%;
height: 2.75em;
::-webkit-inner-spin-button,
::-webkit-calendar-picker-indicator {
    -webkit-appearance: none;
}
::-webkit-calendar-picker-indicator:hover {
  background: rgba(212, 212, 255, 0.035);
}
`
const StyledOption = styled.option`
  margin: 5px;
  color: black;
  font-size: 14px;
`
let _this

class LogWorkForm extends React.Component {

  constructor(props) {
    super(props)

    _this = this

    this.state = {
      message: {
        type: '',
        msg: ''
      },
      logwork: {
        _id: '',
        user: getUser().username,
        typeOfWork: '',
        project: '',
        startTime: '',
        details: '',
        hours: ''
      },
      projects: [],
      typeWorks: [],
      projectSelected: '',
      isEdit: false
    }

  }

  render() {
    return (
      <StyledForm className="grid-wrapper">
        <div className="col-3">
          Date:<br />
          <StyledInput type="date" id="startTime" name="startTime" value={this.state.logwork.startTime} onChange={this.handleUpdate} />
          <br />
        </div>
        <div className="col-3">
          Project:<br />
          <StyledSelect className="button fit" id="selectProject" name="project" onChange={this.handleUpdate} >
            <StyledOption value="" >Select Project</StyledOption>
            {
              this.state.projects.map((value, i) => <StyledOption value={value._id} key={value._id}> {value.title} </StyledOption>)
            }
          </StyledSelect>
          <br />
        </div>
        <div className="col-3">
          Type of Work:<br />
          <StyledSelect className="button fit" id="selectTypeOfWork" name="typeOfWork" onChange={this.handleUpdate} >
            <StyledOption value="" >Select Work</StyledOption>
            {
              this.state.typeWorks.map(value => <StyledOption value={value} key={value}> {value} </StyledOption>)
            }
          </StyledSelect>
          <br />
        </div>

        <div className="col-3">
          Hours Worked:<br />
          <StyledInput type="number" name="hours" placeholder="0" value={this.state.logwork.hours} onChange={this.handleUpdate} />
          <br />
        </div>
        <div className="col-12">
          Description of Work:<br />
          <textarea name="details" rows="6" value={this.state.logwork.details} onChange={this.handleUpdate} />
          <br />
        </div>
        <div className="col-12">
          {
            _this.state.isEdit ? <span><StyledButton href="#" className="button " id="addLogWorkBtn" onClick={this.cancelEdit}>Cancel</StyledButton> <StyledButton href="#" className="button special" id="addLogWorkBtn" onClick={this.updateLogwork}>Edit</StyledButton></span> :
              <StyledButton href="#" className="button special" id="addLogWorkBtn" onClick={this.addNewLogWork}>Submit</StyledButton>
          }
          <br />
        </div>
        <div className="col-12">
          {this.state.message.type === 'ERR' ? <OutMsgError>{this.state.message.msg}</OutMsgError> :
            <OutMsgSuccess>{this.state.message.msg}</OutMsgSuccess>}
        </div>

      </StyledForm>

    )
  }
  // update form changes
  handleUpdate(event) {
    const name = event.target.name;
    const value = event.target.value;
    const proIndex = document.getElementById('selectProject').selectedIndex;

    _this.setState(prevState => ({
      ...prevState,
      logwork: {
        ...prevState.logwork,
        [name]: value
      },
      projectSelected: _this.state.projects[proIndex - 1],
      typeWorks: (_this.state.projects[proIndex - 1] && _this.state.projects[proIndex - 1].typesOfWork) ? _this.state.projects[proIndex - 1].typesOfWork : []
    }))
    setTimeout(() => {
      console.log(_this.state)
    }, 200);





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
  cancelEdit(event) {
    event.preventDefault();
    _this.setState(prevState => ({
      ...prevState,
      logwork: {
        user: getUser().username,
        typeOfWork: '',
        project: '',
        startTime: '',
        details: '',
        hours: ''
      },
      projectSelected: '',
      isEdit: false
    }))
    const mySelectType = document.getElementById("selectTypeOfWork"); // get select element
    mySelectType.selectedIndex = 0;  // set selected index by 0

    const mySelectProject = document.getElementById("selectProject"); // get select element
    mySelectProject.selectedIndex = 0;  // set selected index by 0
    _this.msgUpdate('','');
  }
  // restart state logwork to default for clear inputs
  clearInputs() {
    _this.setState(prevState => ({
      ...prevState,
      logwork: {
        user: getUser().username,
        typeOfWork: '',
        project: '',
        startTime: '',
        details: '',
        hours: ''
      },
      projectSelected: '',
      isEdit: false,
      typeWorks: [],
    }))
    const mySelectType = document.getElementById("selectTypeOfWork"); // get select element
    mySelectType.selectedIndex = 0;  // set selected index by 0



    const mySelectProject = document.getElementById("selectProject"); // get select element
    mySelectProject.selectedIndex = 0;  // set selected index by 0
  }
  // function to add new Log Work
  async addNewLogWork(event) {
    event.preventDefault();
    if (!_this.validateForm())
      return;

    // send request
    const logwork = _this.state.logwork;
    delete logwork._id;
    const resp = await newLogWork(logwork);
    if (resp) {
      _this.msgUpdate('OK', 'Success!!');
      _this.props.isNewFnc();
      _this.clearInputs();
      _this.props.updateTable();
      _this.getProjects()

    } else {
      _this.msgUpdate('ERR', 'ERR!!');
    }
  }
  async updateLogwork(event) {
    event.preventDefault();
    if (!_this.validateForm())
      return;

    // send request
    const logwork = _this.state.logwork;
    const resp = await updateLoggedWork(logwork);
    console.log(resp);
    if (resp) {
      _this.msgUpdate('OK', 'Success!!');
      _this.props.isNewFnc();

      setTimeout(() => {
        _this.clearInputs();
      }, 1000);
      _this.props.updateTable();
      _this.getProjects()

    } else {
      _this.msgUpdate('ERR', 'ERR!!');
    }
  }



  async getProjects() {

    // send request
    const resp = await getProjects();
    console.log(resp);
    // for success response set projects to state else set message to state
    if (resp) {
      _this.setState({
        projects: resp.projects
      })
    }

  }

  // function to validate form
  validateForm() {
    if (!this.state.logwork.project) {
      _this.msgUpdate('ERR', 'Project Required.')
      return false;
    } else if (!this.state.logwork.hours > 0) {
      _this.msgUpdate('ERR', 'Hours value has to be greater than zero')
      return false;
    }
    return true;

  }
  async componentDidMount() {
    _this.getProjects();


  }
  componentDidUpdate(prevProps) {
    // update props  change in component update
    if (this.props.isEdit && this.props.logWorkToEdit._id !== prevProps.logWorkToEdit._id) {
      this.setState({
        isEdit: this.props.isEdit
      })
      if (this.props !== prevProps && this.props.logWorkToEdit._id) {
        const selectProject = document.getElementById('selectProject')
        selectProject.value = this.props.logWorkToEdit.project
        const proIndex = document.getElementById('selectProject').selectedIndex;
        this.setState({
          logwork: {
            _id: this.props.logWorkToEdit._id ? this.props.logWorkToEdit._id : '',
            user: getUser().username,
            typeOfWork: this.props.logWorkToEdit.typeOfWork ? this.props.logWorkToEdit.typeOfWork : '',
            project: this.props.logWorkToEdit.project ? this.props.logWorkToEdit.project : '',
            startTime: this.props.logWorkToEdit.startTime ? this.props.logWorkToEdit.startTime : '',
            details: this.props.logWorkToEdit.details ? this.props.logWorkToEdit.details : '',
            hours: this.props.logWorkToEdit.hours ? this.props.logWorkToEdit.hours : 0,
          },
          projectSelected: _this.state.projects[proIndex - 1],
          typeWorks: (_this.state.projects[proIndex - 1] && _this.state.projects[proIndex - 1].typesOfWork) ? _this.state.projects[proIndex - 1].typesOfWork : []
        })
        setTimeout(() => {
          const selectWorkType = document.getElementById('selectTypeOfWork');
          selectWorkType.value = this.props.logWorkToEdit.typeOfWork
        }, 200);


      }
    }
  }
}
LogWorkForm.propTypes = {
  updateTable: PropTypes.func,
  logWorkToEdit: PropTypes.object,
  isEdit: PropTypes.bool,
  isNewFnc: PropTypes.func

}

export default LogWorkForm


