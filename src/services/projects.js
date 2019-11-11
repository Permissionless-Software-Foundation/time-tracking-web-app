import 'isomorphic-fetch'
import { getUser } from './auth'

//const SERVER = `http://localhost:5001`;
//const SERVER = `/api`
  const SERVER = 'https://ovn.psfoundation.cash/api'

// Detect if the app is running in a browser.
export const isBrowser = () => typeof window !== 'undefined'

// get all projects
export const getProjects = async () => {
  const token = getUser().jwt ? getUser().jwt : ''

  //try to get all projects
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await fetch(`${SERVER}/projects`, options)
    if (resp.ok) {
      return resp.json()
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}
// get  project by id
export const getProjectById = async id => {
  const token = getUser().jwt ? getUser().jwt : ''

  //try to get all projects
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await fetch(`${SERVER}/projects/${id}`, options)
    if (resp.ok) {
      return resp.json()
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

export const newProject = async project => {
  // console.log(project)
  // Try to create a new project
  const token = getUser().jwt ? getUser().jwt : ''
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        project: project,
      }),
    }
    const resp = await fetch(`${SERVER}/projects/`, options)

    if (resp.ok) {
      return resp.json()
    } else {
      return false
    }
  } catch (err) {
    // If something goes wrong , return false.
    return false
  }
}
export const updateProject = async project => {
  // console.log(project)
  // Try to create a new project
  const token = getUser().jwt ? getUser().jwt : ''
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        project: project,
      }),
    }
    const resp = await fetch(`${SERVER}/projects/${project._id}`, options)
    const myResp = await resp.json()

    return myResp
  } catch (err) {
    // If something goes wrong , return false.
    return false
  }
}
