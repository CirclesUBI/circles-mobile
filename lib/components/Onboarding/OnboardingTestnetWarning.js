import React from 'react'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
// import { Text } from '../shared'
import { background1, primary, fonts, textColor1 } from 'circles-mobile/lib/styles'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import { web3Provider } from 'circles-mobile/lib/utilities/blockchain'
// import { PersonFactoryContract } from 'circles-mobile/lib/utilities/blockchain'
// import hello from 'circles-mobile/lib/utilities/blockchain'
import { PersonFactoryABI, PersonFactoryAddress } from 'circles-mobile/lib/abi/PersonFactory'
import { TimeIssuedTokenABI } from 'circles-mobile/lib/abi/TimeIssuedToken'
import { ethers } from 'ethers'

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    alignItems: 'center',
    margin: 45
  },
  loginText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 14
  },
  loginButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
// const clickHandler = async (props) => {
//   let privKey = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'
//   let wallet = new ethers.Wallet(privKey, web3Provider)
//   let PersonFactoryContractSigner = new ethers.Contract(PersonFactoryAddress, PersonFactoryABI, wallet)
//   let tx = await PersonFactoryContractSigner.build()
//   await tx.wait()
//   // props.navigation.navigate('Complete')
// }

export const OnboardingTestnetWarning = (props) => {
  // console.log(web3.eth.accounts)
  // window.here = new web3.eth.Contract(TimeIssuedTokenABI)
  return (
    <View style={{flex: 1, backgroundColor: background1}}>
      <NavBar noBack title='!Attention!' />
      <View style={{flex: 0.9, alignItems: 'center'}}>
        <Text title style={{color: textColor1, marginTop: 15, fontSize: 16, fontFamily: fonts.secondaryText, textAlign: 'center'}}>
          We're On Testnet
        </Text>
        <Text style={{color: textColor1, marginTop: 15, textAlign: 'justify', marginLeft: 30, marginRight: 30}}>
          We are currently in beta of our project. This means that we may have to reset accounts
          and the status of the network.
        </Text>
        <Text style={{color: textColor1, marginTop: 15, textAlign: 'justify', marginLeft: 30, marginRight: 30}}>
          You may be required to create a new Circles account when we move to mainnet.
        </Text>
      </View>
      <View style={{flex: 0.1, backgroundColor: 'white'}}>
        <TouchableHighlight style={[styles.loginButton, {backgroundColor: primary}]} onPress={() => {
          // console.log(tx)
          // PersonFactoryContract.build({from: '0x627306090abab3a6e1400e9345bc60c78a8bef57'}).then(receipt => {
          //   var TimeIssuedToken = new web3.eth.Contract(TimeIssuedTokenABI)
          // })
          // clickHandler(props)
        }}>
          <View>
            <Text style={[styles.loginText, {textAlign: 'center'}]}>CONTINUE</Text>
          </View>

        </TouchableHighlight>
      </View>
    </View>

  )
}

export default OnboardingTestnetWarning
