import { connect } from 'react-redux'

import ConnectScreen from 'circles-mobile/lib/components/ConnectScreen'

// import { storeUser } from 'circles/lib/actions/userActions'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    wallets: state.wallets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // storeUser: (user) => dispatch(storeUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectScreen)
