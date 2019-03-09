import React from 'react'
import { connect } from 'react-redux'
import {
  View
} from 'react-native'
import { LinearGradient } from 'expo'
import OnboardingLogo from '../components/Onboarding/splash/OnboardingLogo'
import OnboardingIntro from '../components/Onboarding/splash/OnboardingIntro'
import OnboardingButtons from '../components/Onboarding/splash/OnboardingButtons'
import { fetchCurrentCountry } from 'circles-mobile/lib/actions/OnboardingActions'
import { addCognitoUserData, initSignIn, confirmSignIn } from 'circles-mobile/lib/actions/AuthActions'
import { selectWallet } from 'circles-mobile/lib/actions/AppActions'
import { createCirclesToken } from 'circles-mobile/lib/sagas/AuthSaga'
import {
  secondary
} from 'circles-mobile/lib/styles'
import { calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'

import { NavigationActions, StackActions } from 'react-navigation'
// import API from '@aws-amplify/api'
import { ConsoleLogger } from '@aws-amplify/core'
import { ethers } from 'ethers'
import {
  customHttpProvider,
  HubContract,
  RelayContract,
  getNonce,
  getTypesFromAbi,
  add0x,
  encodeFunctionTxData
} from 'circles-mobile/lib/utilities/blockchain'
import leftPad from 'left-pad'
const logger = new ConsoleLogger('SplashScreen')

class SplashContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      intlDiallingCode: '+',
      phone: '',
      password: '',
      username: ''
    }
    this.handleLoginButton = this.handleLoginButton.bind(this)
  }

  componentDidMount () {
    logger.info('Mounted')
    this.finalCountdown('test')
    // if (this.props.authState === 'authorized') this.resetToHomeScreen()
  }
  // stripIt (val) {
  //   if (val.slice(0, 2) === '0x') {
  //     return val.slice(2)
  //   }
  //   return val
  // }
  //
  // pad (n) {
  //   if (n.startsWith('0x')) {
  //     n = this.stripIt(n)
  //   }
  //   return leftPad(n, '64', '0')
  // }
  async finalCountdown (username) {
    // let wallet = ethers.Wallet.createRandom()
    // if (wallet) {
    //   const senderKeyPair = {
    //     privateKey: wallet.privateKey,
    //     publicKey: ethers.utils.computePublicKey(wallet.privateKey),
    //     address: wallet.address
    //   }
      // console.log(senderKeyPair, senderKeyPair)
      // const relayNonce = (await getNonce(senderKeyPair.address)).toNumber()
      // console.log('relayNonce', relayNonce)
      // let nonce = ethers.utils.hexlify(relayNonce)
      // let to = HubContract.address
      // let data = HubContract.interface.functions.signup.encode([senderKeyPair.address, username])
      // console.log(
      //   `nonce ${nonce}
      //    to ${HubContract.address}
      //    data ${data}`
      // )
      //up to here is encoded correctly
      // Tight packing, as Solidity sha3 does
      // console.log('serialized', ethers.utils.serializeTransaction({ to, value: 0, data, nonce }))
      // console.log('rlpDecoded', ethers.utils.RLP.decode(ethers.utils.serializeTransaction({ to, value: 0, data, nonce })))
      // console.log('rlpEncoded', ethers.utils.RLP.decode('0xf8a2808080943160c4e534affe4e95041a92064e2fdb005e39e480b8841e88f7dc000000000000000000000000571707f398847bead4113d334780945e0bd2c72f0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000474657374000000000000000000000000000000000000000000000000000000001c8080'))
      // let hashInput = '0x1900' + this.stripIt(RelayContract.address) +
      //   this.stripIt('0x0000000000000000000000000000000000000000') + this.pad(nonce) + this.stripIt(to) + this.stripIt(data)
      // console.log('hashInput', hashInput)
      // var hash = ethers.utils.keccak256(hashInput)
      // console.log('hash', hash)
      // let signingKey = new ethers.utils.SigningKey(wallet.privateKey)
      // var sig = signingKey.signDigest(hash)
      // // var sig = await wallet.signMessage(this.stripIt(hash))
      // console.log('sig', sig)
      // let expandedSig = ethers.utils.splitSignature(sig)
      // console.log('expandedSig', expandedSig)
      // let abi = RelayContract.interface.abi
      // console.log('abi', abi)
      // let functionName = 'relayMetaTx'
      // let args = [ sig.v,
      //   sig.r,
      //   sig.s,
      //   to,
      //   data,
      //   '0x0000000000000000000000000000000000000000'
      // ]
    //   var types = getTypesFromAbi(abi, functionName)
    //   console.log('types', types)
    //   var txData = encodeFunctionTxData(functionName, types, args)
    //   console.log('txData', txData)
    //   var txObject = {}
    //   txObject.to = add0x(RelayContract.address)
    //   txObject.gasPrice = (await customHttpProvider.getGasPrice()).toNumber()
    //   txObject.gasLimit = 1600000
    //   txObject.nonce = add0x(nonce)
    //   txObject.data = add0x(txData)
    //   txObject.value = add0x(ethers.utils.hexlify(0))
    //   console.log('txObject', txObject)
    //   let tx = ethers.utils.serializeTransaction(txObject).slice(2)
    //   console.log(tx)
    // }
  }
  handleUsernameChange (username) {
    this.setState({ username: username })
  }

  handlePasswordChange (password) {
    this.setState({ password: password })
  }

  handleCodeChange (code) {
    this.setState({ code: code })
  }

  handleLoginButton () {
    this.props.navigation.push('Login')
  }

  resetToHomeScreen () {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({
        routeName: 'Main',
        action: NavigationActions.navigate({ routeName: 'Tabs' })
      })]
    }))
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1 }}>
          <OnboardingLogo style={{ marginTop: calculateHeightRatio(66) }} />
          <View style={{ flex: 1.45 }}>
            <OnboardingIntro />
          </View>
          <OnboardingButtons
            navigation={this.props.navigation}
            handleLoginButton={this.handleLoginButton}
            addCognitoUserData={this.props.addCognitoUserData}
            selectWallet={this.props.selectWallet}
          />
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    wallets: state.wallets,
    authState: state.app.authState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentCountry: () => {
      dispatch(fetchCurrentCountry())
    },
    initSignIn: data => {
      dispatch(initSignIn(data))
    },
    confirmSignIn: data => {
      dispatch(confirmSignIn(data))
    },
    addCognitoUserData: data => {
      dispatch(addCognitoUserData(data))
    },
    selectWallet: data => dispatch(selectWallet(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashContainer)
