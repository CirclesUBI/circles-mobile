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
    return new Promise((resolve, reject) => {
      Auth.signIn(username, password)
        .then(cognitoUser => {
          AsyncStorage.multiSet([[this.KEY, 'true'], ['userData', cognitoUser]])
            .then(resolve(true))
            .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
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

  async signOut () {
    await AsyncStorage.multiRemove([this.KEY, 'username'])
    // return new Promise((resolve, reject) => {
    //   Auth.signOut().then(res => {
    //     AsyncStorage.multiRemove([this.KEY, 'username'])
    //       .then(resolve(true))
    //       .catch(err => reject(err))
    //   }).catch(err => reject(err))
    // })
  }

  confirmSignup (username, code) {
    return new Promise((resolve, reject) => {
      Auth.confirmSignUp(username, code)
        .then(res => {
          if (res === 'SUCCESS') {
            Auth.currentAuthenticatedUser()
              .then(cognitoUser => {
                AsyncStorage.multiSet([[this.KEY, 'true'], ['userData', cognitoUser]])
                  .then(resolve(true))
                  .catch(err => reject(err))
              })
              .catch(err => {
                if (err === 'not authenticated') { resolve(false) } else { reject(err) }
              })
          } else reject(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // set storage to hold key as TRUE

  setStorage (userData) { AsyncStorage.setItem('userData', JSON.stringify(userData)) }
  // set storage to hold user data

  getStorage () { return AsyncStorage.getItem('userData') }

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
    })
  }
}

export default new AuthManager()
