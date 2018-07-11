import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
// import { WingBlank, Steps } from 'antd-mobile-rn'
// const Step = Steps.Step
import StepIndicator from 'react-native-step-indicator'
const labels = ['Step 1', 'Step 2', 'Step 3']
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

class AddWallet extends React.Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight style={{alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
          this.props.navigation.navigate('Home')
          // Navigation.dismissAllModals({
          //   animationType: 'none'
          // })
        }}>
          <View style={{width: 30, height: 30, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>X</Text>
          </View>

        </TouchableHighlight>
        <StepIndicator
          stepCount={3}
          customStyles={customStyles}
          currentPosition={0}
          labels={labels}
       />
        <View style={{flex: 1}}>
          <View style={{flex: 10, borderWidth: 1, height: 400}}>
            <View>
              <Text>Add Wallet</Text>
            </View>
          </View>

          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableHighlight style={{alignSelf: 'flex-end', backgroundColor: 'white', height: 30, justifyContent: 'center'}} onPress={() => {
              this.props.navigation.navigate('addOrgWallet.AddOffer')
            }}>
              <Text>{`Next >`}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

export default AddWallet
