import 'isomorphic-fetch'
import { getUser } from './auth'

// const SERVER = `http://localhost:5001`;
//const SERVER = `/api`
const SERVER = 'https://ovn.psfoundation.cash/api'

// Detect if the app is running in a browser.
export const isBrowser = () => typeof window !== 'undefined'
// url to download cvs loggedworks data
export const urlToGetLoggedworksCSV = `${SERVER}/loggedwork/csv`
// get all loggedworks
export const getLoggedworks = async () => {
  //try get all loggedworks
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const resp = await fetch(`${SERVER}/loggedwork`, options)
    if (resp.ok) {
      return resp.json()
    } else {
      return false
    }
  } catch (e) {
    return false
  }
}

export const newLogWork = async loggedwork => {
  console.log(loggedwork)
  // Try to create new loggedwork
  const token = getUser().jwt ? getUser().jwt : ''
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        loggedWork: loggedwork,
      }),
    }
    const resp = await fetch(`${SERVER}/loggedwork/`, options)

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
export const updateLoggedWork = async loggedwork => {
  console.log(loggedwork)
  // Try to create new loggedwork
  const token = getUser().jwt ? getUser().jwt : ''
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        loggedWork: loggedwork,
      }),
    }
    const resp = await fetch(`${SERVER}/loggedwork/${loggedwork._id}`, options)
    const myResp = await resp.json()

    return myResp
  } catch (err) {
    // If something goes wrong , return false.
    console.log(err)
    return false
  }
}
