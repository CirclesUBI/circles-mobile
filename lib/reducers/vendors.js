// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'

let initialState = {
  vendorList: [{
    title: 'This is title',
    thumb: require('circles-mobile/images/cafe.png'),
    body: 'Omg this is amazing'
  }, {
    title: 'This is title',
    thumb: require('circles-mobile/images/restaurant.png'),
    body: 'Omg this is amazing'
  }]
}

export default function vendorsReducer (state = initialState, action) {
  switch (action.type) {
    // case ITEM_ADDED:
    //   state.items.push(action.newItem)
    //   return Object.assign({}, state, {items: state.items})
    default:
      return state
  }
}
