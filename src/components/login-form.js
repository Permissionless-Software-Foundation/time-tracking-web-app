/*
  A simple login form.
*/

import React from 'react'
import styled from 'styled-components'
import { handleLogin, setUser } from '../services/auth'
import { navigate } from 'gatsby'

//const SERVER = `http://localhost:5001`;
const SERVER = '/api'
//const SERVER = 'https://ovn.psfoundation.cash/api'

const StyledButton = styled.a`
  margin: 10px;
  margin-bottom: 25px;
`

const OutMsg = styled.p`
  color: red;
  font-weight: bold;
  size: 18px;
`

let _this

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    _this = this

    this.state = {
      message: '',
      username: '',
      password: '',
    }
    this.validateEntries = this.validateEntries.bind(this)
  }

  render() {
    return (
      <form>
        Username:
        <br />
        <input
          type="text"
          name="username"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleUpdate}
        />
        <br />
        Password:
        <br />
        <input
          type="password"
          name="password"
          onKeyDown={this.handleKeyDown}
          onChange={this.handleUpdate}
        />
        <br></br>
        <StyledButton
          href="#"
          className="button special"
          id="createBtn"
          onClick={this.createClick}
          data-to="bitcoincash:qzl6k0wvdd5ky99hewghqdgfj2jhcpqnfq8xtct0al"
        >
          Create
        </StyledButton>
        <StyledButton
          href="#"
          className="button special"
          id="loginBtn"
          onClick={this.loginClick}
          data-to="bitcoincash:qzl6k0wvdd5ky99hewghqdgfj2jhcpqnfq8xtct0al"
        >
          Login
        </StyledButton>
        <br />
        <OutMsg>{this.state.message}</OutMsg>
      </form>
    )
  }
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      _this.loginClick(e)
    }
  }
  handleUpdate(event) {
    _this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async createClick(event) {
    event.preventDefault()
    if (!_this.validateEntries()) {
      return
    }

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: _this.state.username,
            password: _this.state.password,
          },
        }),
      }
      console.log(options)
      const data = await fetch(`${SERVER}/users/`, options)
      const users = await data.json()
      console.log(`users: ${JSON.stringify(users, null, 2)}`)

      //console.log(`name: ${users.user.username}`)
      //console.log(`token: ${users.token}`)

      setUser({
        username: users.user.username,
        jwt: users.token,
      })

      navigate(`/`)
    } catch (err) {
      // If something goes wrong with auth, return false.
      //return false;
      _this.setState(prevState => ({
        message: err.message,
      }))
    }
  }

  async loginClick(event) {
    event.preventDefault()

    // validate required entries
    if (!_this.validateEntries()) {
      return
    }

    // send request
    const resp = await handleLogin(_this.state)

    // validate response
    if (resp === false) {
      _this.setState(prevState => ({
        message: 'Login Error',
      }))
      return
    }

    navigate(`/`)
  }

  validateEntries() {
    if (!_this.state.username && !_this.state.password) {
      _this.setState(prevState => ({
        message: 'Username and password required.',
      }))
      return false
    } else if (!_this.state.username) {
      _this.setState(prevState => ({
        message: 'Username  required.',
      }))
      return false
    } else if (!_this.state.password) {
      _this.setState(prevState => ({
        message: 'Password  required.',
      }))
      return false
    }
    return true
  }
}

export default LoginForm
