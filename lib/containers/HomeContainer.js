import { connect } from 'react-redux'

import HomeScreen from 'circles-mobile/lib/components/HomeScreen'
import { selectWallet } from 'circles-mobile/lib/actions/AppActions'
import { getOrgs, getOwnOrgs } from 'circles-mobile/lib/actions/OrganizationActions'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    wallets: state.wallets,
    organizations: state.organizations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectWallet: (wallet) => dispatch(selectWallet(wallet)),
    getOrgs: () => dispatch(getOrgs()),
    getOwnOrgs: () => dispatch(getOwnOrgs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
