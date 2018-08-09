// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'

let initialState = {
  'Knitted Socks Org': {
    balance: 20000,
    admins: {
      '0x': {
        name: 'Blah Blah'
      }
    }
  },
  'Anarchy in the USA': {
    balance: 10000,
    admins: {
    }
  }
}

export default function walletReducer (state = initialState, action) {
  switch (action.type) {
    // case ITEM_ADDED:
    //   state.items.push(action.newItem)
    //   return Object.assign({}, state, {items: state.items})
    default:
      return state
  }
}
