// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'

let initialState = {
  address: '0x',
  name: 'Ashoka Finley',
  balance: 10000
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    // case ITEM_ADDED:
    //   state.items.push(action.newItem)
    //   return Object.assign({}, state, {items: state.items})
    default:
      return state
  }
}
