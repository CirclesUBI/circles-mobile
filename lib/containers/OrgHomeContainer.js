import { connect } from 'react-redux'

import OrgHomeScreen from 'circles-mobile/lib/components/OrgHomeScreen'
import { walletSelect } from 'circles-mobile/lib/actions/UserActions'

// import { storeUser } from 'circles/lib/actions/userActions'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    vendors: state.vendors,
    wallets: state.wallets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectWallet: (wallet) => dispatch(walletSelect(wallet))
    // storeUser: (user) => dispatch(storeUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrgHomeScreen)
