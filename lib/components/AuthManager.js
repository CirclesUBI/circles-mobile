import React from 'react'

import { Auth } from 'aws-amplify'

import store from 'circles-mobile/lib/store'
import { addData } from 'circles-mobile/lib/actions/OnboardingActions'

class AuthManager extends React.Component {
  constructor (props) {
    super(props)

    this.KEY = 'edzillion'
  }

  signIn (username, password) {
    return new Promise((resolve, reject) => {
      Auth.signIn(username, password)
        .then(res => {
          if (res.constructor.name === 'CognitoUser') {
            store.dispatch(addData({phone: username, isSignedIn: true}))
            resolve(res)
          } else reject(res)
        })
        .catch(err => reject(err))
    })
  }

  confirmSignIn (code) {
    return Auth.confirmSignIn(code)
  }

  signUp (username, password, name, email, phone) {
    return Auth.signUp({
      username,
      password,
      attributes: {
        email: email,
        name: name,
        phone_number: phone
      }
    })
  }

  signOut () {
    return new Promise((resolve, reject) => {
      Auth.signOut()
        .then(res => {
          store.dispatch(addData({isSignedIn: false}))
          resolve(res)
        })
        .catch(err => reject(err))
    })
  }

  confirmSignup (username, password, code) {
    return new Promise((resolve, reject) => {
      Auth.confirmSignUp(username, code)
        .then(res => {
          if (res === 'SUCCESS') {
            this.signIn(username, password)
              .then(cognitoUser => resolve(cognitoUser))
              .catch(err => reject(err))
          }
        })
        .catch(err => reject(err))
    })
  }

  isSignedIn () {
    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser()
        .then(cognitoUser => {
          resolve(cognitoUser)
        })
        .catch(err => {
          if (err === 'not authenticated') { resolve(false) } else { reject(err) }
        })
    })
  }
}

export default new AuthManager()
