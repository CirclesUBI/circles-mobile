import { connect } from 'react-redux'

import HomeScreen from 'circles-mobile/lib/components/HomeScreen'

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
    // storeUser: (user) => dispatch(storeUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
