import { connect } from 'react-redux'

import HomeScreen from 'circles-mobile/lib/components/HomeScreen'
import { walletSelect } from 'circles-mobile/lib/actions/UserActions'
import { getOrgs } from 'circles-mobile/lib/actions/OrganizationActions'
// import { storeUser } from 'circles/lib/actions/userActions'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    wallets: state.wallets,
    organizations: state.organizations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectWallet: (wallet) => dispatch(walletSelect(wallet)),
    getOrgs: () => dispatch(getOrgs())
    // storeUser: (user) => dispatch(storeUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
