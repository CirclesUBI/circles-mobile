import { connect } from 'react-redux'

import SearchScreen from 'circles-mobile/lib/components/SearchScreen'

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     storeUser: (user) => dispatch(storeUser(user))
//   }
// }

export default connect(mapStateToProps, {})(SearchScreen)
