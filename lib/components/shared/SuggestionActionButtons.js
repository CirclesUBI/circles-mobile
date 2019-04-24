import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import ActionButtons from 'circles-mobile/lib/components/Buttons/actionButtons'
import { textColor1, background1, fonts } from 'circles-mobile/lib/styles'
import { dismissedContact } from 'circles-mobile/lib/actions/AppActions'

class SuggestionActionButtons extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.translate = translate
  }

  render () {
    return (
      <View style={{flex: 1}}>
        {this.props.app.contactSuggestion
          ? (<View style={{flex: 0.68, backgroundColor: background1}}>
            <Text style={{
              fontFamily: fonts.primaryText,
              fontSize: 12,
              color: textColor1,
              marginLeft: 23,
              marginRight: 23,
              marginTop: 20
            }}>
              {this.translate('Connect with people in your network that you trust to spend your circles')}
            </Text>
            <TouchableWithoutFeedback onPress={() => this.props.dismissContact()}>
              <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 24}}>
                <Text style={{fontFamily: fonts.boldText, color: textColor1}}>
                  {this.translate('Skip')}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>)
          : <View /> }
        { this.props.user.validated
          ? <ActionButtons expand={!this.props.app.contactSuggestion} single navigation={this.props.navigation} />
          : <ActionButtons expand={!this.props.app.contactSuggestion} navigation={this.props.navigation} />
        }
      </View>
    )
  }
}

SuggestionActionButtons.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    vendors: state.vendors,
    wallets: state.wallets,
    inventory: state.inventory,
    // updates: state.updates,
    app: state.app
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dismissContact: () => dispatch(dismissedContact())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionActionButtons)
