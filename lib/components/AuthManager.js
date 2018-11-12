import React from 'react'
import { AsyncStorage } from 'react-native'
// react-native's version of local storage

import { Auth } from 'aws-amplify'

class AuthManager extends React.Component {
  constructor (props) {
    super(props)

    this.KEY = 'edzillion'
    // this.signUp = this.signUp.bind(this)
    // this.confirmSignup = this.confirmSignup.bind(this)
    // this.setStorage = this.setStorage.bind(this)
    // this.isSignedIn = this.isSignedIn.bind(this)
    // this.isSignedInAWS = this.isSignedInAWS.bind(this)
  }

  signIn (username, password) {
    AsyncStorage.setItem(this.KEY, 'true')
    return Auth.signIn(username, password)
  }

  signUp (username, password, email) {
    return Auth.signUp({
      username,
      password,
      attributes: {
        email: email
      }
    })
  }

  confirmSignup (username, code) {
    return Auth.confirmSignUp(username, code)
  }

  // set storage to hold key as TRUE

  setStorage (data) { AsyncStorage.setItem('data', JSON.stringify(data)) }
  // set storage to hold user data

  signOut () { AsyncStorage.removeItem(this.KEY) }
  // if user signs out, remove TRUE key

  isSignedIn () {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.KEY)
        .then(res => {
          if (res !== null) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch(err => reject(err))
    })
  }

  isSignedInAWS () {
    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser()
        .then(user => {
          resolve(true)
        })
        .catch(err => {
          if (err === 'not authenticated') { resolve(false) } else { reject(err) }
        })
    }
    )
  }
}

export default new AuthManager()
